// 3. src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import axios from 'axios'


axios.defaults.baseURL="https://infoganza-quiz.onrender.com"

function App() { 
  const [userInfo, setUserInfo] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-blue-50">
        <Routes>
          <Route path="/" element={<RegisterPage setUserInfo={setUserInfo} setSubmissionId={setSubmissionId} />} />
          <Route path="/quiz" element={<QuizPage userInfo={userInfo} submissionId={submissionId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
