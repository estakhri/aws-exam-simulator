import { useState } from 'react'

function FlashCard({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([...questions])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isEditingNumber, setIsEditingNumber] = useState(false)
  const [editValue, setEditValue] = useState('')

  const currentQuestion = shuffledQuestions[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setSelectedAnswer(null)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shuffledQuestions.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setSelectedAnswer(null)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + shuffledQuestions.length) % shuffledQuestions.length)
    }, 150)
  }

  const handleShuffle = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setShuffledQuestions(shuffled)
    // Reset to first card after shuffle
    setCurrentIndex(0)
    setIsFlipped(false)
    setSelectedAnswer(null)
  }

  const handleNumberClick = () => {
    setIsEditingNumber(true)
    setEditValue(String(currentIndex + 1))
  }

  const handleNumberChange = (e) => {
    const value = e.target.value
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setEditValue(value)
    }
  }

  const handleNumberSubmit = () => {
    const num = parseInt(editValue, 10)
    if (!isNaN(num) && num >= 1 && num <= shuffledQuestions.length) {
      setCurrentIndex(num - 1)
      setIsFlipped(false)
      setSelectedAnswer(null)
    }
    setIsEditingNumber(false)
    setEditValue('')
  }

  const handleNumberKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNumberSubmit()
    } else if (e.key === 'Escape') {
      setIsEditingNumber(false)
      setEditValue('')
    }
  }

  const handleOptionClick = (idx, e) => {
    e.stopPropagation() // Prevent card flip
    if (selectedAnswer === null) {
      setSelectedAnswer(idx)
      setIsFlipped(true)
    }
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="container">
      <div className="navigation" style={{ marginBottom: '20px' }}>
        <button className="btn btn-secondary" onClick={handlePrev}>← Previous</button>
        <button className="btn btn-primary" onClick={handleShuffle}>🔀 Shuffle</button>
        <button className="btn btn-secondary" onClick={handleNext}>Next →</button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}></div>
      </div>

      <div className="stats" style={{ marginBottom: '20px' }}>
        <div className="stat-item">
          {isEditingNumber ? (
            <input
              type="text"
              className="stat-value"
              value={editValue}
              onChange={handleNumberChange}
              onBlur={handleNumberSubmit}
              onKeyDown={handleNumberKeyDown}
              autoFocus
              style={{
                width: '60px',
                textAlign: 'center',
                border: '2px solid #ff9900',
                borderRadius: '8px',
                padding: '5px',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}
            />
          ) : (
            <div
              className="stat-value"
              onClick={handleNumberClick}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Click to jump to a specific question"
            >
              {currentIndex + 1}
            </div>
          )}
          <div className="stat-label">Current {isEditingNumber ? '(Press Enter)' : '(Click to edit)'}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{shuffledQuestions.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ fontSize: '1rem' }}>{currentQuestion.topic}</div>
          <div className="stat-label">Topic</div>
        </div>
      </div>

      <div className="card question-card">
        {!isFlipped ? (
          <>
            <span className="question-number">Question {currentQuestion.id}</span>
            <p className="question-text" style={{ textAlign: 'left' }}>{currentQuestion.question}</p>
            <div className="options" style={{ textAlign: 'left', marginTop: '20px' }}>
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className="option"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleOptionClick(idx, e)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
            <p className="flashcard-hint" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsFlipped(true)}>
              👆 Select an answer or click here to reveal
            </p>
          </>
        ) : (
          <>
            {selectedAnswer !== null ? (
              <h3 style={{ marginBottom: '20px', color: isCorrect ? '#4caf50' : '#f44336' }}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </h3>
            ) : (
              <h3 style={{ marginBottom: '20px', color: '#4caf50' }}>✓ Correct Answer</h3>
            )}

            <div className="options" style={{ textAlign: 'left', marginBottom: '20px' }}>
              {currentQuestion.options.map((option, idx) => {
                let className = 'option'
                if (idx === currentQuestion.correctAnswer) {
                  className += ' correct'
                } else if (selectedAnswer === idx) {
                  className += ' incorrect'
                }
                return (
                  <div key={idx} className={className} style={{ cursor: 'default' }}>
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-text">{option}</span>
                  </div>
                )
              })}
            </div>

            <div className="explanation">
              <h4>💡 Explanation</h4>
              <p>{currentQuestion.explanation}</p>
            </div>
            <p className="flashcard-hint" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => { setIsFlipped(false); setSelectedAnswer(null); }}>
              👆 Click to try again
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default FlashCard

