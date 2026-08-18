import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Questions from "./pages/Questions";
import DSA from "./pages/DSA";
import Profile from "./pages/Profile";
import QuizPage from "./pages/QuizPage";
import SRSPractice from "./components/SRS/SRSPractice";
import SRSStats from "./components/SRS/SRSStats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/srs-practice" element={<SRSPractice />} />
        <Route path="/srs-stats" element={<SRSStats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
