function TopicMode({ topics, questions, onSelectTopic, onBack }) {
  const getTopicIcon = (topic) => {
    const icons = {
      'Storage': '💾',
      'Compute': '⚡',
      'Database': '🗄️',
      'Networking': '🌐',
      'Security': '🔒',
      'Analytics': '📊',
      'Migration': '🚀',
      'High Availability': '🔄'
    }
    return icons[topic] || '📋'
  }

  const getTopicDescription = (topic) => {
    const descriptions = {
      'Storage': 'S3, EBS, EFS, Glacier, Storage Gateway',
      'Compute': 'EC2, Lambda, ECS, EKS, Auto Scaling',
      'Database': 'RDS, DynamoDB, Aurora, ElastiCache',
      'Networking': 'VPC, CloudFront, Route 53, Direct Connect',
      'Security': 'IAM, KMS, WAF, Shield, Organizations',
      'Analytics': 'Athena, EMR, Kinesis, QuickSight',
      'Migration': 'DMS, Snowball, DataSync, Transfer Family',
      'High Availability': 'Multi-AZ, Load Balancing, Disaster Recovery'
    }
    return descriptions[topic] || 'AWS Services and Best Practices'
  }

  const getQuestionCount = (topic) => {
    return questions.filter(q => q.topic === topic).length
  }

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '10px', color: '#232f3e' }}>📚 Topic-Based Practice</h2>
        <p style={{ color: '#666' }}>Select a topic to practice questions from that specific area</p>
      </div>

      <div className="topic-grid">
        {topics.map((topic) => (
          <div 
            key={topic} 
            className="topic-card"
            onClick={() => onSelectTopic(topic)}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{getTopicIcon(topic)}</div>
            <h3>{topic}</h3>
            <p>{getTopicDescription(topic)}</p>
            <div style={{ 
              marginTop: '15px', 
              padding: '8px 16px', 
              background: '#fff3e0', 
              borderRadius: '20px',
              display: 'inline-block',
              color: '#ff9900',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {getQuestionCount(topic)} Questions
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="btn btn-secondary" onClick={onBack}>← Back to Home</button>
      </div>
    </div>
  )
}

export default TopicMode

