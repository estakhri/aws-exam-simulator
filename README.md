# AWS Solutions Architect Professional Exam Simulator

A modern, interactive exam simulator for AWS Solutions Architect Professional (SAP-C02) certification preparation.

![AWS SAP Exam Simulator](https://img.shields.io/badge/AWS-SAP--C02-FF9900?style=for-the-badge&logo=amazon-aws)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

## 🎯 Features

### Three Study Modes

1. **🎴 Flash Cards**
   - Review questions one at a time
   - Click to flip and reveal answers
   - Shuffle functionality for randomized practice
   - Progress tracking

2. **📚 Topic-Based Practice**
   - Focus on specific AWS domains
   - Topics include: Storage, Compute, Database, Networking, Security, Analytics, Migration, High Availability
   - Filter questions by topic for targeted study

3. **📝 Full Exam Simulator**
   - Timed exam experience
   - Immediate feedback after each answer
   - Detailed explanations for all questions
   - Score calculation with 72% passing threshold
   - Results summary with pass/fail status

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/estakhri/aws-exam-simulator.git

# Navigate to project directory
cd aws-exam-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages

This project includes a GitHub Actions workflow for automatic deployment.

1. Push your code to GitHub
2. Go to repository **Settings** → **Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. The app will automatically deploy on every push to `main`

Your app will be available at: `https://YOUR_GITHUB_USER_NAME.github.io/aws-exam-simulator/`

You can see the live version here
![AWS Solution Architect Exam Simulator](https://estakhri.github.io/aws-exam-simulator/)

## 📁 Project Structure

```
aws-exam-simulator/
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Styling
│   ├── components/
│   │   ├── FlashCard.jsx    # Flash card mode
│   │   ├── TopicMode.jsx    # Topic selection
│   │   └── ExamSimulator.jsx # Exam simulator mode
│   └── data/
│       └── questions.js     # Question bank
├── public/
│   └── aws-icon.svg         # App icon
├── .github/workflows/
│   └── deploy.yml           # GitHub Pages deployment
├── index.html
├── vite.config.js
└── package.json
```

## 📊 Question Topics

| Topic | Description |
|-------|-------------|
| Storage | S3, EBS, EFS, Glacier, Storage Gateway |
| Compute | EC2, Lambda, ECS, EKS, Auto Scaling |
| Database | RDS, DynamoDB, Aurora, ElastiCache |
| Networking | VPC, CloudFront, Route 53, Direct Connect |
| Security | IAM, KMS, WAF, Shield, Organizations |
| Analytics | Athena, EMR, Kinesis, QuickSight |
| Migration | DMS, Snowball, DataSync, Transfer Family |
| High Availability | Multi-AZ, Load Balancing, Disaster Recovery |

## 🛠️ Adding More Questions

To add more questions, edit `src/data/questions.js`:

```javascript
{
  id: 1,
  topic: "Storage",
  question: "Your question text here...",
  options: [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  correctAnswer: 0,  // Index of correct option (0-3)
  explanation: "Explanation of why this answer is correct..."
}
```

## 🔧 Technologies Used

- **React 19** - UI framework
- **Vite 5** - Build tool and dev server
- **CSS3** - Modern styling with CSS variables
- **GitHub Actions** - CI/CD pipeline

## 📝 License

ISC License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Good luck with your AWS Solutions Architect Professional certification! 🎉**

