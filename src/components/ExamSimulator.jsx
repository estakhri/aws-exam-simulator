import { useState, useEffect } from 'react'

function ExamSimulator({ questions: allQuestions, onBack, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [examStarted, setExamStarted] = useState(false)

  // Editable settings
  const [questionCount, setQuestionCount] = useState(Math.min(allQuestions.length, 65))
  const [timePerQuestion, setTimePerQuestion] = useState(2) // minutes per question
  const [passingScore, setPassingScore] = useState(72)

  // Actual exam questions (shuffled subset)
  const [examQuestions, setExamQuestions] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!examStarted || showResults) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [examStarted, showResults])

  const handleStartExam = () => {
    // Shuffle and select questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, questionCount)
    setExamQuestions(selected)
    setTimeLeft(questionCount * timePerQuestion * 60)
    setExamStarted(true)
  }

  // Use examQuestions when exam is started, otherwise use allQuestions for display
  const questions = examStarted ? examQuestions : allQuestions

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentIndex]: optionIndex })
    setShowExplanation(true)
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    setShowExplanation(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++
    })
    return correct
  }

  if (!examStarted) {
    const inputStyle = {
      width: '80px',
      padding: '8px 12px',
      fontSize: '1.2rem',
      fontWeight: '600',
      textAlign: 'center',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      color: '#232f3e'
    }

    const labelStyle = {
      display: 'block',
      marginTop: '8px',
      color: '#666',
      fontSize: '0.85rem'
    }

    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px', color: '#232f3e' }}>{title}</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Customize your exam settings below, then click Start Exam.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div>
              <input
                type="number"
                min="1"
                max={allQuestions.length}
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), allQuestions.length))}
                style={inputStyle}
              />
              <span style={labelStyle}>Questions (max {allQuestions.length})</span>
            </div>

            <div>
              <input
                type="number"
                min="1"
                max="10"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(Math.min(Math.max(1, parseInt(e.target.value) || 1), 10))}
                style={inputStyle}
              />
              <span style={labelStyle}>Min per Question</span>
            </div>

            <div>
              <input
                type="number"
                min="1"
                max="100"
                value={passingScore}
                onChange={(e) => setPassingScore(Math.min(Math.max(1, parseInt(e.target.value) || 1), 100))}
                style={inputStyle}
              />
              <span style={labelStyle}>Passing Score %</span>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontWeight: '600', color: '#232f3e' }}>Total Time: </span>
                <span style={{ color: '#ff9900', fontWeight: '600' }}>{formatTime(questionCount * timePerQuestion * 60)}</span>
              </div>
              <div>
                <span style={{ fontWeight: '600', color: '#232f3e' }}>To Pass: </span>
                <span style={{ color: '#ff9900', fontWeight: '600' }}>{Math.ceil(questionCount * passingScore / 100)} correct answers</span>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleStartExam} style={{ marginRight: '10px' }}>
            Start Exam
          </button>
          <button className="btn btn-secondary" onClick={onBack}>
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= passingScore

    const handleRetake = () => {
      setShowResults(false)
      setCurrentIndex(0)
      setAnswers({})
      setExamQuestions([])
      setExamStarted(false)
    }

    return (
      <div className="container">
        <div className="card results-card">
          <h2 style={{ marginBottom: '20px' }}>Exam Results</h2>
          <div className={`score-circle ${passed ? 'pass' : 'fail'}`}>
            <span className="score-percent">{percentage}%</span>
            <span className="score-label">{passed ? 'PASSED' : 'FAILED'}</span>
          </div>
          <div className="stats" style={{ justifyContent: 'center' }}>
            <div className="stat-item">
              <div className="stat-value">{score}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{questions.length - score}</div>
              <div className="stat-label">Incorrect</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{questions.length}</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
          <p style={{ marginTop: '15px', color: '#888', fontSize: '0.9rem' }}>
            Passing score: {passingScore}%
          </p>
          <p style={{ marginTop: '10px', color: '#666' }}>
            {passed ? '🎉 Congratulations! You passed the exam!' : '📚 Keep studying and try again!'}
          </p>
          <div style={{ marginTop: '30px' }}>
            <button className="btn btn-primary" onClick={handleRetake}>
              Retake Exam
            </button>
            <button className="btn btn-secondary" onClick={onBack} style={{ marginLeft: '10px' }}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = answers[currentIndex]
  const isAnswered = selectedAnswer !== undefined

  return (
    <div className="container">
      <div className="navigation" style={{ marginBottom: '20px' }}>
        <button className="btn btn-secondary" onClick={handlePrev} disabled={currentIndex === 0}>← Previous</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Exam</button>
        <button className="btn btn-secondary" onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next →</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ background: '#232f3e', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>
          ⏱️ {formatTime(timeLeft)}
        </div>
        <div style={{ color: '#666' }}>
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
      </div>
      <div className="card question-card">
        <span className="question-number">{currentQuestion.topic}</span>
        <p className="question-text">{currentQuestion.question}</p>
        <div className="options">
          {currentQuestion.options.map((option, idx) => {
            let className = 'option'
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswer) className += ' correct'
              else if (idx === selectedAnswer) className += ' incorrect'
            } else if (selectedAnswer === idx) {
              className += ' selected'
            }
            return (
              <div key={idx} className={className} onClick={() => !isAnswered && handleAnswer(idx)}>
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </div>
            )
          })}
        </div>
        {showExplanation && isAnswered && (
          <div className="explanation">
            <h4>💡 Explanation</h4>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamSimulator

