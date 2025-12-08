import { useState } from 'react'
import { questions } from './data/questions_extracted'
import FlashCard from './components/FlashCard'
import TopicMode from './components/TopicMode'
import ExamSimulator from './components/ExamSimulator'

function App() {
  const [mode, setMode] = useState('home')
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [...new Set(questions.map(q => q.topic))]

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    setMode('topic-exam')
  }

  const renderContent = () => {
    switch (mode) {
      case 'flashcard':
        return <FlashCard questions={questions} onBack={() => setMode('home')} />
      case 'topic':
        return <TopicMode topics={topics} questions={questions} onSelectTopic={handleTopicSelect} onBack={() => setMode('home')} />
      case 'topic-exam':
        return <ExamSimulator questions={questions.filter(q => q.topic === selectedTopic)} onBack={() => setMode('topic')} title={`${selectedTopic} Questions`} />
      case 'exam':
        return <ExamSimulator questions={questions} onBack={() => setMode('home')} title="Full Exam Simulator" />
      default:
        return (
          <div className="container">
            <div className="card" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '15px', color: '#232f3e' }}>Welcome to AWS SAP Exam Simulator</h2>
              <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                Prepare for your AWS Solutions Architect Professional certification with our comprehensive exam simulator.
                Choose a study mode below to get started.
              </p>
            </div>
            
            <div className="mode-selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div className="card topic-card" onClick={() => setMode('flashcard')}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎴</div>
                <h3>Flash Cards</h3>
                <p>Review questions one at a time. Click to reveal the answer and explanation.</p>
                <div style={{ marginTop: '15px', color: '#ff9900', fontWeight: '600' }}>{questions.length} Cards Available</div>
              </div>
              
              <div className="card topic-card" onClick={() => setMode('topic')}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
                <h3>Topic-Based Practice</h3>
                <p>Focus on specific AWS topics like Storage, Compute, Security, and more.</p>
                <div style={{ marginTop: '15px', color: '#ff9900', fontWeight: '600' }}>{topics.length} Topics Available</div>
              </div>
              
              <div className="card topic-card" onClick={() => setMode('exam')}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
                <h3>Full Exam Simulator</h3>
                <p>Take a timed practice exam with all questions. Track your score and progress.</p>
                <div style={{ marginTop: '15px', color: '#ff9900', fontWeight: '600' }}>Timed Exam Mode</div>
              </div>
            </div>
            
            <div className="stats" style={{ marginTop: '40px', justifyContent: 'center' }}>
              <div className="stat-item">
                <div className="stat-value">{questions.length}</div>
                <div className="stat-label">Total Questions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{topics.length}</div>
                <div className="stat-label">Topics</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">SAP-C02</div>
                <div className="stat-label">Exam Code</div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => setMode('home')} style={{ cursor: 'pointer' }}>
            <span style={{ fontSize: '2rem' }}>☁️</span>
            <h1>AWS <span>SAP</span> Exam Simulator</h1>
          </div>
          {mode !== 'home' && (
            <button className="btn btn-secondary" onClick={() => setMode('home')}>
              ← Back to Home
            </button>
          )}
        </div>
      </header>
      {renderContent()}
    </div>
  )
}

export default App

