#!/usr/bin/env python3
"""
Full AWS Exam Question Extractor
Extracts questions with options from PDF and matches with answers from TXT file.

Usage:
    python full_extractor.py --pdf ../../Questions.pdf --answers ../../Answers.txt --output ../src/data/questions_full.js

Requirements:
    pip install pypdf2
    # Or use pdftotext (poppler-utils): sudo apt install poppler-utils
"""

import re
import json
import argparse
import subprocess
from pathlib import Path
from typing import Dict, List, Tuple, Optional


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF using pdftotext command."""
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', pdf_path, '-'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error extracting PDF: {e}")
        return ""
    except FileNotFoundError:
        print("pdftotext not found. Install poppler-utils: sudo apt install poppler-utils")
        return ""


def parse_pdf_questions(pdf_text: str) -> Dict[int, dict]:
    """Parse questions and options from PDF text."""
    questions = {}

    # Split by "Question #N" pattern
    pattern = r'Question\s+#(\d+).*?Topic\s+\d+\s*\n(.*?)(?=Question\s+#\d+|$)'
    matches = re.findall(pattern, pdf_text, re.DOTALL | re.IGNORECASE)

    print(f"  Found {len(matches)} question blocks in PDF")

    for q_num_str, content in matches:
        q_num = int(q_num_str)

        # Clean up the content
        content = content.strip()

        # Extract question text (before options - look for A. or A))
        q_match = re.search(r'^(.*?)(?=\n\s*A[\.\)])', content, re.DOTALL)
        if not q_match:
            continue

        question_text = q_match.group(1).strip()
        question_text = re.sub(r'\s+', ' ', question_text)

        # Extract options A, B, C, D - they start with letter followed by . or )
        options = []

        # Find option A
        opt_a = re.search(r'\n\s*A[\.\)]\s*(.*?)(?=\n\s*B[\.\)])', content, re.DOTALL)
        if opt_a:
            options.append(re.sub(r'\s+', ' ', opt_a.group(1)).strip())

        # Find option B
        opt_b = re.search(r'\n\s*B[\.\)]\s*(.*?)(?=\n\s*C[\.\)])', content, re.DOTALL)
        if opt_b:
            options.append(re.sub(r'\s+', ' ', opt_b.group(1)).strip())

        # Find option C
        opt_c = re.search(r'\n\s*C[\.\)]\s*(.*?)(?=\n\s*D[\.\)])', content, re.DOTALL)
        if opt_c:
            options.append(re.sub(r'\s+', ' ', opt_c.group(1)).strip())

        # Find option D (goes until end or next question)
        opt_d = re.search(r'\n\s*D[\.\)]\s*(.*?)$', content, re.DOTALL)
        if opt_d:
            options.append(re.sub(r'\s+', ' ', opt_d.group(1)).strip())

        if len(options) >= 4:
            questions[q_num] = {
                'question': question_text,
                'options': options[:4]
            }

    return questions


def parse_answers_file(answers_path: str) -> Dict[int, dict]:
    """Parse the answers text file and extract answer data."""
    with open(answers_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by separator lines
    questions_raw = re.split(r'-{20,}', content)
    answers = {}

    for block in questions_raw:
        block = block.strip()
        if not block:
            continue

        # Extract question number
        match = re.match(r'(\d+)\]', block)
        if not match:
            continue

        q_num = int(match.group(1))

        # Extract question text (everything between number and ans-)
        q_text_match = re.search(r'\d+\]\s*(.+?)(?=\n\s*ans-)', block, re.DOTALL | re.IGNORECASE)
        question_text = ""
        if q_text_match:
            question_text = re.sub(r'\s+', ' ', q_text_match.group(1)).strip()

        # Extract the answer line
        ans_match = re.search(r'ans-\s*(.+?)(?:\n\n|\n(?=[A-Z][a-z]))', block, re.IGNORECASE | re.DOTALL)
        if not ans_match:
            ans_match = re.search(r'ans-\s*(.+?)$', block, re.IGNORECASE | re.DOTALL)
        answer_text = ans_match.group(1).strip() if ans_match else ""
        answer_text = re.sub(r'\s+', ' ', answer_text)

        # Try to find correct answer letter - look for patterns like "A.", "Option A", etc.
        correct_letter = None
        # Check if answer starts with letter
        letter_match = re.match(r'^([A-D])[\.\)\s]', answer_text)
        if letter_match:
            correct_letter = letter_match.group(1)
        else:
            # Look for "Correct answer" pattern
            correct_match = re.search(r'correct\s+(?:answer\s+)?(?:is\s+)?([A-D])', block, re.IGNORECASE)
            if correct_match:
                correct_letter = correct_match.group(1).upper()

        # Extract explanation (everything after ans- line)
        explanation = ""
        if ans_match:
            after_ans = block[ans_match.end():]
            explanation = re.sub(r'\s+', ' ', after_ans).strip()

        answers[q_num] = {
            'question': question_text,
            'answer_text': answer_text,
            'correct_letter': correct_letter,
            'explanation': explanation if explanation else answer_text
        }

    return answers


def categorize_topic(text: str) -> str:
    """Categorize question into a topic based on keywords."""
    text = text.lower()
    
    topic_keywords = {
        'Storage': ['s3', 'ebs', 'efs', 'glacier', 'storage gateway', 'snowball', 'fsx', 'backup'],
        'Compute': ['ec2', 'lambda', 'ecs', 'eks', 'fargate', 'auto scaling', 'batch', 'instance'],
        'Database': ['rds', 'dynamodb', 'aurora', 'elasticache', 'redshift', 'documentdb', 'database'],
        'Networking': ['vpc', 'cloudfront', 'route 53', 'direct connect', 'transit gateway', 'nat', 'subnet'],
        'Security': ['iam', 'kms', 'waf', 'shield', 'cognito', 'secrets manager', 'security', 'encryption'],
        'Analytics': ['athena', 'emr', 'kinesis', 'quicksight', 'glue', 'opensearch', 'analytics'],
        'Migration': ['dms', 'migration', 'datasync', 'transfer', 'snowball', 'migrate'],
        'High Availability': ['multi-az', 'load balancer', 'disaster', 'failover', 'replication', 'availability']
    }
    
    for topic, keywords in topic_keywords.items():
        for keyword in keywords:
            if keyword in text:
                return topic
    
    return 'General'


def find_matching_option(answer_text: str, options: List[str]) -> int:
    """Find the best matching option for an answer text."""
    answer_clean = answer_text.lower().strip()

    # First check for "Correct answer X:" pattern in answer text
    letter_match = re.search(r'correct\s+answer\s+([A-D])', answer_clean)
    if letter_match:
        return ord(letter_match.group(1).upper()) - ord('A')

    # Check if answer starts with "A.", "B.", etc.
    letter_prefix = re.match(r'^([A-D])[\.\)]?\s*', answer_text.strip())
    if letter_prefix:
        return ord(letter_prefix.group(1).upper()) - ord('A')

    # Try to match the answer text with one of the options
    best_match = 0
    best_score = 0

    for i, option in enumerate(options):
        option_clean = option.lower().strip()

        # Check if the answer text is contained in the option or vice versa
        if answer_clean[:50] in option_clean or option_clean[:50] in answer_clean:
            # Calculate match score based on common words
            answer_words = set(re.findall(r'\w+', answer_clean))
            option_words = set(re.findall(r'\w+', option_clean))
            common_words = answer_words & option_words
            score = len(common_words)

            if score > best_score:
                best_score = score
                best_match = i

    return best_match


def merge_and_build_questions(pdf_questions: Dict, answers_data: Dict) -> List[dict]:
    """Merge PDF questions with answers and build final structure."""
    questions = []

    # Use PDF questions as base since they have the options
    for q_num in sorted(pdf_questions.keys()):
        pdf_q = pdf_questions.get(q_num, {})
        ans_q = answers_data.get(q_num, {})

        # Get question text from PDF
        question_text = pdf_q.get('question', '')

        # Get options from PDF
        options = pdf_q.get('options', [])

        # Skip if we don't have options
        if len(options) < 4:
            continue

        # Determine correct answer index - try matching answer text with options
        answer_text = ans_q.get('answer_text', '')
        correct_idx = find_matching_option(answer_text, options)

        # Also check explanation for "Correct answer X" pattern
        explanation = ans_q.get('explanation', '')
        letter_match = re.search(r'[Cc]orrect\s+[Aa]nswer\s+([A-D])', explanation)
        if letter_match:
            correct_idx = ord(letter_match.group(1).upper()) - ord('A')

        # Combine answer_text and explanation for the explanation field
        full_explanation = explanation if explanation else answer_text

        # Categorize topic
        topic = categorize_topic(question_text + ' ' + full_explanation)

        questions.append({
            'id': q_num,
            'topic': topic,
            'question': question_text,
            'options': options[:4],
            'correctAnswer': max(0, min(correct_idx, 3)),
            'explanation': full_explanation
        })

    return questions


def save_as_js(questions: List[dict], output_path: str):
    """Save questions as JavaScript module."""
    js_content = "// AWS Solutions Architect Pro Exam Questions\n"
    js_content += "// Auto-generated from PDF and Answers files\n\n"
    js_content += "export const questions = "
    js_content += json.dumps(questions, indent=2, ensure_ascii=False)
    js_content += ";\n"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)


def main():
    parser = argparse.ArgumentParser(description='Extract AWS exam questions to JSON/JS')
    parser.add_argument('--pdf', type=str, help='Path to Questions PDF file')
    parser.add_argument('--answers', type=str, required=True, help='Path to Answers.txt file')
    parser.add_argument('--output', type=str, default='questions.json', help='Output file (.json or .js)')
    
    args = parser.parse_args()
    
    # Extract PDF text if provided
    pdf_questions = {}
    if args.pdf and Path(args.pdf).exists():
        print(f"Extracting from PDF: {args.pdf}")
        pdf_text = extract_text_from_pdf(args.pdf)
        pdf_questions = parse_pdf_questions(pdf_text)
        print(f"Found {len(pdf_questions)} questions in PDF")
    
    # Parse answers file
    print(f"Parsing answers: {args.answers}")
    answers_data = parse_answers_file(args.answers)
    print(f"Found {len(answers_data)} answers")
    
    # Merge and build
    questions = merge_and_build_questions(pdf_questions, answers_data)
    print(f"Built {len(questions)} complete questions")
    
    # Save output
    output_path = Path(args.output)
    if output_path.suffix == '.js':
        save_as_js(questions, str(output_path))
    else:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {output_path}")
    
    # Print statistics
    topics = {}
    for q in questions:
        topics[q['topic']] = topics.get(q['topic'], 0) + 1
    print("\nTopic distribution:")
    for topic, count in sorted(topics.items(), key=lambda x: -x[1]):
        print(f"  {topic}: {count}")


if __name__ == '__main__':
    main()

