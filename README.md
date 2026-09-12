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
App runs on: https://smart-interview-preparation-platfor-khaki.vercel.app/login

---

## 👤 Author

**Aayushi**  

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
