#!/usr/bin/env python3
"""
AWS Exam Question Extractor
Extracts questions from PDF and answers from TXT file, outputs to JSON format.

Usage:
    python extract_questions.py --pdf ../Questions.pdf --answers ../Answers.txt --output questions.json
"""

import re
import json
import argparse
import subprocess
from pathlib import Path


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


def parse_answers_file(answers_path: str) -> dict:
    """Parse the answers text file and extract question data."""
    with open(answers_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by separator lines
    questions_raw = re.split(r'-{20,}', content)
    questions = {}
    
    for block in questions_raw:
        block = block.strip()
        if not block:
            continue
        
        # Extract question number
        match = re.match(r'(\d+)\]', block)
        if not match:
            continue
        
        q_num = int(match.group(1))
        
        # Extract the answer line
        ans_match = re.search(r'ans-\s*(.+?)(?:\n|$)', block, re.IGNORECASE)
        answer_text = ans_match.group(1).strip() if ans_match else ""
        
        # Extract explanation (everything after ans- line)
        explanation = ""
        if ans_match:
            after_ans = block[ans_match.end():]
            # Clean up the explanation
            explanation = re.sub(r'\s+', ' ', after_ans).strip()
        
        # Extract the question text (between number and ans-)
        q_text_match = re.search(r'\d+\]\s*(.+?)(?=ans-|$)', block, re.DOTALL | re.IGNORECASE)
        question_text = ""
        if q_text_match:
            question_text = re.sub(r'\s+', ' ', q_text_match.group(1)).strip()
        
        questions[q_num] = {
            'question': question_text,
            'answer': answer_text,
            'explanation': explanation
        }
    
    return questions


def categorize_topic(question_text: str, answer_text: str) -> str:
    """Categorize question into a topic based on keywords."""
    text = (question_text + " " + answer_text).lower()
    
    topic_keywords = {
        'Storage': ['s3', 'ebs', 'efs', 'glacier', 'storage gateway', 'snowball', 'fsx'],
        'Compute': ['ec2', 'lambda', 'ecs', 'eks', 'fargate', 'auto scaling', 'batch'],
        'Database': ['rds', 'dynamodb', 'aurora', 'elasticache', 'redshift', 'documentdb'],
        'Networking': ['vpc', 'cloudfront', 'route 53', 'direct connect', 'transit gateway', 'nat gateway'],
        'Security': ['iam', 'kms', 'waf', 'shield', 'cognito', 'secrets manager', 'certificate'],
        'Analytics': ['athena', 'emr', 'kinesis', 'quicksight', 'glue', 'opensearch'],
        'Migration': ['dms', 'migration', 'datasync', 'transfer family', 'application discovery'],
        'High Availability': ['multi-az', 'load balancer', 'disaster recovery', 'failover', 'replication']
    }
    
    for topic, keywords in topic_keywords.items():
        for keyword in keywords:
            if keyword in text:
                return topic
    
    return 'General'


def extract_options_from_answer(answer_text: str) -> tuple:
    """Try to determine correct answer letter from answer text."""
    # Look for patterns like "A.", "Option A", etc.
    match = re.match(r'^([A-D])[\.\)]?\s*', answer_text.strip())
    if match:
        return match.group(1)
    return None


def build_questions_json(answers_data: dict, pdf_text: str = "") -> list:
    """Build the final questions JSON structure."""
    questions = []
    
    for q_num, data in sorted(answers_data.items()):
        topic = categorize_topic(data['question'], data['answer'])
        
        # Create question entry
        question_entry = {
            'id': q_num,
            'topic': topic,
            'question': data['question'],
            'options': [],  # Will need manual population or PDF parsing
            'correctAnswer': 0,  # Default, needs manual verification
            'explanation': data['explanation'] if data['explanation'] else data['answer']
        }
        
        questions.append(question_entry)
    
    return questions


def main():
    parser = argparse.ArgumentParser(description='Extract AWS exam questions to JSON')
    parser.add_argument('--pdf', type=str, help='Path to Questions PDF file')
    parser.add_argument('--answers', type=str, required=True, help='Path to Answers.txt file')
    parser.add_argument('--output', type=str, default='questions.json', help='Output JSON file')
    
    args = parser.parse_args()
    
    # Extract PDF text if provided
    pdf_text = ""
    if args.pdf and Path(args.pdf).exists():
        print(f"Extracting text from PDF: {args.pdf}")
        pdf_text = extract_text_from_pdf(args.pdf)
        print(f"Extracted {len(pdf_text)} characters from PDF")
    
    # Parse answers file
    print(f"Parsing answers file: {args.answers}")
    answers_data = parse_answers_file(args.answers)
    print(f"Found {len(answers_data)} questions in answers file")
    
    # Build questions JSON
    questions = build_questions_json(answers_data, pdf_text)
    
    # Save to JSON file
    output_path = Path(args.output)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(questions)} questions to {output_path}")
    
    # Print topic distribution
    topics = {}
    for q in questions:
        topic = q['topic']
        topics[topic] = topics.get(topic, 0) + 1
    
    print("\nTopic distribution:")
    for topic, count in sorted(topics.items(), key=lambda x: -x[1]):
        print(f"  {topic}: {count}")


if __name__ == '__main__':
    main()

