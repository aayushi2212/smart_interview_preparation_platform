# Smart Interview Preparation Platform

A comprehensive web application designed to help users prepare for technical interviews through structured learning paths, spaced repetition, adaptive practice, and real-time progress tracking.

---

## 🎯 Key Features

### Core Learning Modules
- **📚 Interview Questions** - 100+ curated technical interview questions across multiple categories
- **🔢 DSA Problems** - 50+ Data Structure & Algorithm problems with dual C++/Java solutions
- **📝 MCQ Quiz System** - 50 multiple-choice questions across 10 categories with instant feedback
- **🎯 Spaced Repetition System (SRS)** - SM-2 algorithm-based intelligent question scheduling
- **📊 Progress Dashboard** - Real-time statistics with per-category and per-topic analytics

### Smart Learning Features
- **Intelligent Scheduling** - Auto-reschedule questions based on performance
- **Performance Tracking** - Track success rates, attempt history, and improvement
- **Quality-Based Intervals** - Questions return at optimal times using SM-2 algorithm
- **Review History** - Detailed logs with quality ratings and timestamps
- **Category Analytics** - Visual progress bars for each topic

### User Experience
- **Secure Authentication** - JWT-based user authentication with bcryptjs hashing
- **User Profiles** - Personal dashboards with learning statistics
- **Responsive Design** - Desktop, tablet, and mobile optimization
- **Real-time Updates** - Live statistics and progress synchronization

---

## 🛠️ Tech Stack

### Frontend
- React 18+ - UI library
- React Router - Client-side routing
- Axios - HTTP client
- CSS3 - Responsive styling

### Backend
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB object modeling
- JWT - JSON Web Tokens for authentication
- bcryptjs - Password encryption
- CORS - Cross-origin requests

### Algorithm
- SuperMemo SM-2 - Spaced Repetition algorithm

---

## 📁 Project Structure

```
Smart_Interview_Preparation_Platform/
│
├── backend/
│   ├── models/
│   │   ├── User.js                 # User data with SRS stats
│   │   ├── InterviewQuestion.js    # Interview questions
│   │   ├── DSAQuestion.js          # DSA problems
│   │   ├── MCQQuestion.js          # MCQ questions
│   │   └── SRSCard.js              # Spaced Repetition cards
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # Authentication endpoints
│   │   ├── questionRoutes.js       # Interview questions API
│   │   ├── dsaRoutes.js            # DSA problems API
│   │   ├── mcqRoutes.js            # MCQ quiz API
│   │   ├── profileRoutes.js        # User profile API
│   │   └── srs.js                  # Spaced Repetition System API
│   │
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT authentication
│   │
│   ├── utils/
│   │   └── srsAlgorithm.js         # SM-2 algorithm implementation
│   │
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── data/
│   │   ├── questionsData.js        # Interview questions data
│   │   ├── dsaData.js              # DSA problems data
│   │   └── mcqData.js              # MCQ questions data
│   │
│   ├── server.js                   # Express server entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   │
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   │
│   │   │   ├── Questions/
│   │   │   │   └── Questions.jsx
│   │   │   │
│   │   │   ├── MCQ/
│   │   │   │   └── QuizPage.jsx
│   │   │   │
│   │   │   ├── Profile/
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   └── SRS/                # NEW - Spaced Repetition
│   │   │       ├── SRSPractice.jsx
│   │   │       ├── SRSStats.jsx
│   │   │       └── SRSPractice.css
│   │   │
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ 
- npm or yarn
- MongoDB Atlas account

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with:
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# Seed sample data (optional)
npm run seed:questions
npm run seed:dsa
npm run seed:mcq

# Start server
npm start
```

Server runs on: `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

App runs on: `http://localhost:3000`

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register           - Create new account
POST   /api/auth/login              - Login user
POST   /api/auth/forgot-password    - Password reset request
```

### Interview Questions
```
GET    /api/questions               - Get all questions
GET    /api/questions/:id           - Get specific question
POST   /api/questions               - Create question (admin)
PUT    /api/questions/:id           - Update question (admin)
DELETE /api/questions/:id           - Delete question (admin)
```

### DSA Problems
```
GET    /api/dsa                     - Get all DSA problems
GET    /api/dsa/:id                 - Get specific problem
PUT    /api/dsa/progress/:id        - Mark problem as solved
```

### MCQ Quiz
```
GET    /api/mcq                     - Get all MCQ questions
POST   /api/mcq/attempt             - Submit quiz attempt
GET    /api/mcq/results/:attemptId  - Get quiz results
```

### User Profile
```
GET    /api/profile                 - Get user profile
PUT    /api/profile                 - Update profile
GET    /api/profile/progress        - Get progress statistics
```

### Spaced Repetition System (SRS) ✨ NEW
```
POST   /api/srs/create-card         - Create SRS card for question
POST   /api/srs/submit-review       - Submit answer (quality 0-5)
GET    /api/srs/due-cards           - Get cards due for today
GET    /api/srs/cards-by-status     - Get card counts by status
GET    /api/srs/stats               - Get SRS statistics
GET    /api/srs/stats/:cardId       - Get individual card stats
POST   /api/srs/toggle-suspend/:id  - Suspend/resume card
```

---

## 🧠 Spaced Repetition System (SRS)

### What is SRS?
The Spaced Repetition System uses the **SuperMemo SM-2 algorithm** to optimize learning by scheduling question reviews at mathematically optimal intervals based on your performance.

### How It Works

**1. Create Card**
- When you attempt a question, an SRS card is created
- Card tracks interval, easiness factor, and review history

**2. Rate Your Answer (0-5 scale)**
```
5 = Perfect response
4 = Correct with some difficulty
3 = Correct after serious difficulty
2 = Incorrect but remember answer
1 = Incorrect, knew the answer
0 = Complete blackout
```

**3. Algorithm Calculates Next Review**
- Quality < 3: Reset to learning phase (1 day)
- Quality ≥ 3: Increase interval using formula
- Easiness factor adjusts based on performance

**4. Review Schedule**
```
1st review: 1 day
2nd review: 3 days
3rd+ reviews: previous_interval × easiness_factor
```

### Example Learning Timeline
```
DAY 1: Answer Question → Quality: 5 (Perfect)
       Easiness: 2.5 | Interval: 1 day
       ↓
DAY 2: Answer Again → Quality: 4 (Very Good)
       Easiness: 2.5 | Interval: 3 days
       ↓
DAY 5: Answer Again → Quality: 5 (Perfect)
       Easiness: 2.5 | Interval: 7 days (3 × 2.5)
       ↓
DAY 12: Answer Again → Quality: 4 (Very Good)
        Easiness: 2.46 | Interval: 17 days (7 × 2.46)
```

### Card Status
- **New** - Never attempted
- **Learning** - Recently failed, needs practice
- **Review** - Mastered, periodic review needed
- **Suspended** - Temporarily paused

### Features
✅ Smart scheduling based on performance  
✅ Quality-based interval calculation  
✅ Review history with timestamps  
✅ Status management and transitions  
✅ Real-time statistics dashboard  
✅ Progress tracking per card  

---

## 🧪 Testing SRS with Postman

### 1. Create SRS Card
```
POST http://localhost:5000/api/srs/create-card
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "questionId": "YOUR_QUESTION_ID"
}
```

### 2. Get Due Cards
```
GET http://localhost:5000/api/srs/due-cards
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
```

### 3. Submit Review (Perfect Answer)
```
POST http://localhost:5000/api/srs/submit-review
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "cardId": "YOUR_SRS_CARD_ID",
  "quality": 5,
  "timeSpent": 45,
  "userAnswer": "Your answer text here"
}
```

### 4. Get Statistics
```
GET http://localhost:5000/api/srs/stats
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 💾 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  
  // Progress tracking
  seenQuestions: [Number],
  seenDSA: [Number],
  solvedDSA: [Number],
  mcqAttempted: [Number],
  mcqSolved: [Number],
  
  // SRS Statistics
  srsStats: {
    totalCards: Number,
    newCards: Number,
    learningCards: Number,
    reviewCards: Number,
    totalReviews: Number,
    averageEasinessFactor: Number
  },
  
  // SRS Preferences
  srsTargets: {
    newCardsPerDay: Number,
    reviewsPerDay: Number
  },
  
  timestamps: true
}
```

### SRSCard Model
```javascript
{
  userId: ObjectId,           // User who created card
  questionId: ObjectId,       // Reference to question
  category: String,           // Question category
  difficulty: String,         // easy/medium/hard
  
  // SM-2 Algorithm Fields
  interval: Number,           // Days until next review
  easinessFactor: Number,     // 1.3 - 2.5 (higher = easier)
  repetitions: Number,        // Times reviewed successfully
  
  // Scheduling
  nextReviewDate: Date,       // When to review next
  lastReviewDate: Date,       // Last review timestamp
  
  // Performance
  quality: Number,            // 0-5 scale
  reviews: [{                 // Review history
    date: Date,
    quality: Number,
    timeSpent: Number,
    userAnswer: String
  }],
  
  // Management
  status: String,             // new/learning/review/suspended
  suspended: Boolean,
  
  timestamps: true
}
```

---

## 🔐 Security

- ✅ JWT-based authentication
- ✅ Bcryptjs password hashing (salt rounds: 10)
- ✅ Protected API routes with middleware
- ✅ Environment variables for sensitive data
- ✅ CORS enabled for frontend
- ✅ User data isolation

---

## 📱 Responsive Design

- ✅ Desktop: 1920px and above
- ✅ Tablet: 768px to 1919px
- ✅ Mobile: 320px to 767px

All components are fully responsive and tested across devices.

---

## 📊 Available Scripts

### Backend
```bash
npm start                # Start development server
npm run seed:questions   # Seed interview questions data
npm run seed:dsa         # Seed DSA problems data
npm run seed:mcq         # Seed MCQ questions data
```

### Frontend
```bash
npm start                # Start development server
npm run build            # Build for production
npm test                 # Run tests
```

---

## 🎓 User Flow

1. **Register/Login** → Create account or login with credentials
2. **Dashboard** → View overall progress and statistics
3. **Learn** → Browse interview questions and DSA problems
4. **Practice** → Take MCQ quizzes with instant feedback
5. **SRS Practice** → Use spaced repetition for optimal learning
6. **Track Progress** → View analytics and improvement metrics
7. **Profile** → Update settings and preferences

---

## 🚀 Deployment

### Backend (Heroku/Render)
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy build/ folder
```

---

## 📈 Recent Updates (v1.1.0)

### ✨ Spaced Repetition System Added
- Implemented SuperMemo SM-2 algorithm for intelligent scheduling
- Created SRSCard model with comprehensive review tracking
- Built 7 new API endpoints for SRS functionality
- Designed SRSPractice component with 6-point quality rating system
- Created SRSStats dashboard for learning analytics
- Enhanced User model with srsStats tracking

### 🐛 Bug Fixes
- Fixed MongoDB DNS resolution errors
- Improved error handling in API routes
- Enhanced authentication middleware

---

## 🗺️ Future Roadmap

- [ ] Code execution playground (Judge0 integration)
- [ ] Mock interviews with video recording
- [ ] Study groups and peer learning
- [ ] Company-specific question sets
- [ ] AI-powered feedback (Claude API)
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration features
- [ ] Advanced analytics and insights
- [ ] Export progress reports (PDF)
- [ ] Dark mode support

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Aayu**  
Student ID: 202512101

---

## 🙏 Acknowledgments

- SuperMemo SM-2 Algorithm creators
- MongoDB and Express.js communities
- React documentation
- All open-source contributors

---

## 📞 Support & Issues

- 🐛 Found a bug? Open an issue on GitHub
- 💬 Have a feature request? Start a discussion
- 📧 Need help? Email for support

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT.io](https://jwt.io)
- [SuperMemo Learning](https://supermemopedia.com/wiki/SuperMemo_SM-2_Algorithm)

---

**Built with ❤️ for smarter interview preparation**

Last Updated: July 2026  
Version: 1.1.0 (SRS Edition)
