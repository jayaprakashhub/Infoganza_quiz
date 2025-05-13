import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = ({ userInfo, submissionId }) => {
  const [answers, setAnswers] = useState(Array(20).fill(''));
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

const questions = [
    // 1. Fill-in-the-Blank
    {
      question: 'Find the second highest salary from the employee table.',
      type: 'fill'
    },
    // 2. Fill-in-the-Blank
    {
      question: 'SQL statements are terminated using a __________.',
      type: 'fill'
    },
    // 3. Fill-in-the-Blank
    {
      question: 'A __________ is used to enforce a link between two tables.',
      type: 'fill'
    },
    // 4. Fill-in-the-Blank
    {
      question:'Select names of employees with salary greater than average salary from employees table.',
      type: 'fill'
    },
    // 5. Fill-in-the-Blank
    {
      question: "Get all records from the orders table where the status is 'Delivered'.",
      type: 'fill'
    },
    // 6. Fill-in-the-Blank
    {
      question: 'Find students who are older than 18 from students table.',
      type: 'fill'
    },
    // 7. Fill-in-the-Blank
    {
      question: 'Display the names of customers in alphabetical order from customer table.',
      type: 'fill'
    },
    // 8. Fill-in-the-Blank
    {
      question: "Find all employees who work in the 'HR' department from employees table.",
      type: 'fill'
    },
    // 9. Fill-in-the-Blank
    {
      question: 'Get the highest salary from the employees table.',
      type: 'fill'
    },
    // 10. Fill-in-the-Blank
    {
      question: 'The __________ command permanently saves changes made by a transaction.',
      type: 'fill'
    },
    // 11. Fill-in-the-Blank
    {
      question: 'Count how many students are in the students table.',
      type: 'fill'
    },
    // 12. Fill-in-the-Blank
    {
      question: 'The __________ function returns the number of non-null values in a column.',
      type: 'fill'
    },
    // 13. Fill-in-the-Blank
    {
      question: 'Retrieve the names and marks of students who scored exactly 100 from students table.',
      type: 'fill'
    },
    // 14. Fill-in-the-Blank
    {
      question: 'List all products that cost more than 500 from products table.',
      type: 'fill'
    },
    // 15. Fill-in-the-Blank
    {
      question: 'A __________ join returns only the matching rows from both tables.',
      type: 'fill'
    },
    // 16. MCQ
    {
      question: 'Which SQL clause is used to filter rows after aggregation?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY']
    },
    // 17. MCQ
    {
      question: 'Which of the following does not return duplicate rows by default?',
      options: ['JOIN', 'SELECT', 'UNION', 'UNION ALL']
    },
    // 18. MCQ
    {
      question: 'What type of JOIN includes all rows from the left table, even if there are no matches in the right table?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'CROSS JOIN']
    },
    // 19. MCQ
    {
      question: 'Which SQL keyword allows you to check if a subquery returns any records?',
      options: ['EXISTS', 'HAVING', 'CHECK', 'VALIDATE']
    },
    // 20. MCQ
    {
      question: 'Which of the following statements will remove a table structure permanently?',
      options: ['DELETE', 'TRUNCATE', 'ERASE', 'DROP']
    }
  ];


  useEffect(() => {
    if (userInfo && submissionId) {
      setStartTime(Date.now());
    }
  }, [userInfo, submissionId]);

  useEffect(() => {
    // If time runs out, submit automatically
    if (timeLeft === 0) {
      handleSubmit();
    } else {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const handleOptionChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const unanswered = answers.filter(ans => !ans).length;
    if (unanswered > 0 && !window.confirm(`You have ${unanswered} unanswered questions. Do you still want to submit?`)) {
      return;
    }

    setIsSubmitting(true);
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    try {
      const res = await axios.put(`/api/submit/${submissionId}`, {
        answers,
        timeTaken
      });

      if (res.status === 200) {
        setSubmitted(true);
      } else {
        alert('Error submitting quiz');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-green-600">Congratulations!</h2>
          <p className="text-lg text-gray-700">
            Thank you for completing the quiz, <span className="font-semibold text-green-700">{userInfo?.name}</span>!
          </p>
          <div className="flex justify-center">
            <img
              src="https://illustrations.popsy.co/gray/success.svg"
              alt="Success Illustration"
              className="w-40 h-40"
            />
          </div>
          <div className="text-gray-600 text-md space-y-2">
            <p>You have taken a big step toward your learning journey.</p>
            <p>Keep challenging yourself and aim higher every day!</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition transform hover:scale-105"
          >
            Go to Home
          </button>
          <p className="text-sm text-gray-400 mt-4">Need more practice? Visit our home page for more quizzes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome, {userInfo?.name}</h2>

        {/* Timer display */}
        <div className="text-center text-2xl font-bold mb-6 text-blue-600">
          Time Left: {formatTime(timeLeft)}
        </div>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          {questions.map((q, i) => (
            <div key={i} className="p-4 rounded-lg bg-blue-50 shadow-sm">
              <p className="font-semibold text-gray-800 mb-3">{i + 1}. {q.question}</p>

              {q.options && (
                <div className="ml-4 space-y-2">
                  {q.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${i}`}
                        value={opt}
                        checked={answers[i] === opt}
                        onChange={() => handleOptionChange(i, opt)}
                        className="accent-blue-500"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === 'fill' && !q.options && (
                <input
                  type="text"
                  value={answers[i] || ''}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full font-semibold transition disabled:opacity-50"
            disabled={isSubmitting || submitted}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
