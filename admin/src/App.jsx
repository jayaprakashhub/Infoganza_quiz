import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminResults from './AdminResults.jsx';
import axios from 'axios';

axios.defaults.baseURL="https://infoganza-quiz.onrender.com"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminResults />} />
        {/* You can add more routes like user quiz here */}
      </Routes>
    </Router>
  );
};

export default App;
