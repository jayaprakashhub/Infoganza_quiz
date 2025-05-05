import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = ({ userInfo, submissionId }) => {
  const [answers, setAnswers] = useState(Array(30).fill(''));
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

 const questions = [
  // 1. MCQ
  {
    question: 'What is the worst-case time complexity of Linear search?',
    options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)']
  },
  // 2. MCQ
  {
    question: 'In a relational database, which operation is used to combine data from two tables based on a related column?',
    options: ['UNION', 'JOIN', 'SELECT', 'INTERSECT']
  },
  // 3. MCQ
  {
    question: 'The sum of two numbers is 48, and their difference is 12. What are the numbers?',
    options: ['30 and 18', '28 and 20', '32 and 16', '36 and 12']
  },
  // 4. Fill-in-the-Blank
  {
    question: 'The full form of SQL is __________.',
    type: 'fill'
  },
  // 5. MCQ
  {
    question: 'A shopkeeper marks an item at ₹800 and gives a 10% discount. What is the selling price?',
    options: ['₹700', '₹720', '₹750', '₹780']
  },
  // 6. MCQ
  {
    question: 'What will be the output of the following Python code? x = [1, 2, 3]; print(x * 2)',
    options: ['[1, 2, 3, 1, 2, 3]', '[1, 3, 2, 1, 2, 3]', '[2, 1, 4, 5, 3, 2]', '[1, 2, 3, 4, 3, 2, 1]']
  },
  // 7. MCQ
  {
    question: 'A = 5 years older than B, B = 3 years older than C. If C is 10 years old, A is __________ years old.',
    options: ['15', '18', '20', '25']
  },
  // 8. MCQ
  {
    question: 'Which data structure is used for implementing recursion?',
    options: ['Queue', 'Stack', 'Linked List', 'Array']
  },
  // 9. MCQ
  {
    question: 'Which SQL command is used to remove a table and all its data?',
    options: ['DROP', 'DELETE', 'TRUNCATE', 'REMOVE']
  },
  // 10. MCQ
  {
    question: 'If today is Monday, what will be the day after 45 days?',
    options: ['Sunday', 'Monday', 'Thursday', 'Wednesday']
  },
  // 11. MCQ
  {
    question: 'Python uses __________ indentation for defining blocks of code.',
    options: ['Curly braces', 'Tabs or spaces', 'Parentheses', 'Semicolons']
  },
  // 12. MCQ
  {
    question: 'What is the result of System.out.println(10 + 20 + "30"); in Java?',
    options: ['3030', '102030', '3020', '60']
  },
  // 13. MCQ
  {
    question: 'A person travels 60 km, 70 km, and 90 km in three hours. Average speed is __________ km/h.',
    options: ['60', '70', '72', '73.3']
  },
  // 14. MCQ
  {
    question: 'What is the LCM of 12 and 15?',
    options: ['30', '60', '45', '90']
  },
  // 15. MCQ
  {
    question: 'What keyword is used in Python to define a function?',
    options: ['func', 'function', 'def', 'define']
  },
  // 16. MCQ
  {
    question: 'A number when divided by 7 gives remainder 3. Its square divided by 7 gives remainder __________.',
    options: ['2', '1', '4', '3']
  },
  // 17. MCQ
  {
    question: 'Choose the correct synonym for "Ephemeral":',
    options: ['Temporary', 'Permanent', 'Transparent', 'Unchangeable']
  },
  // 18. MCQ
  {
    question: 'Which of these is a primary key constraint in SQL used for?',
    options: ['Preventing duplicate rows', 'Hiding data', 'Encrypting columns', 'None of these']
  },
  // 19. MCQ
  {
    question: 'HTML stands for __________.',
    options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'HighText Machine Language', 'Home Tool Markup Language']
  },
  // 20. MCQ
  {
    question: 'Which of these is a loop in C?',
    options: ['if', 'switch', 'for', 'case']
  },
  // 21. MCQ
  {
    question: 'What will be the output of print(2 ** 3 + 5 % 3) in Python?',
    options: ['10', '11', '7', '13']
  },
  // 22. MCQ
  {
    question: 'Which algorithm is used for finding the shortest path in a graph?',
    options: ['Dijkstra’s Algorithm', 'DFS', 'BFS', 'Prim’s Algorithm']
  },
  // 23. MCQ
  {
    question: 'In a certain code, "MANGO" is written as "NBOHP". How is "APPLE" written?',
    options: ['BQQMF', 'BRRMF', 'CQQMF', 'BPPLE']
  },
  // 24. MCQ
  {
    question: 'If x = "100", what will be the result of int(x) + 50 in Python?',
    options: ['150', '10050', '50', 'Error']
  },
  // 25. MCQ
  {
    question: 'Which keyword is used in SQL to sort the result in descending order?',
    options: ['SORT BY DESC', 'ORDER BY DESC', 'DESC ORDER', 'ARRANGE DESC']
  },
  // 26. MCQ
  {
    question: 'In recursion, the condition that ends the recursive calls is called the __________ condition.',
    options: ['Limit', 'End', 'Base', 'Final']
  },
  // 27. MCQ
  {
    question: 'Identify the output: print(len("banana")) in Python.',
    options: ['3', '4', '5', '6']
  },
  // 28. MCQ
  {
    question: 'If A is the brother of B, B is the sister of C, and C is the son of D, how is A related to D?',
    options: ['Son', 'Daughter', 'Brother', 'Father']
  },
  // 29. MCQ
  {
    question: 'What is the postfix of the expression: A + B * C?',
    options: ['A B C * +', 'A + B C *', 'A B + C *', 'A * B + C']
  },
  // 30. MCQ
  {
    question: 'The number of edges in a complete graph with n vertices is __________.',
    options: ['n(n-1)/2', 'n²', 'n + 1', 'n(n+1)/2']
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
