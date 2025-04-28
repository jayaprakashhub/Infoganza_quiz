import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPage = ({ userInfo, submissionId }) => {
  const [answers, setAnswers] = useState(Array(24).fill(''));
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();

 const questions = [
        // 1. MCQ
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyperlink Tool and Markup Language']
        },
        // 2. MCQ
        {
          question: 'Which language is used for styling web pages?',
          options: ['HTML', 'JQuery', 'CSS', 'XML']
        },
        // 3. MCQ
        {
          question: 'Which is not a JavaScript framework?',
          options: ['Python Script', 'JQuery', 'Django', 'NodeJS']
        },
        // 4. Fill-in-the-Blank
        {
          question: 'CSS stands for _________.',
          type:'fill'
        },
        // 5. MCQ
        {
          question: 'Which of the following is used to connect an application to a database?',
          options: ['PHP', 'HTML', 'JS', 'React']
        },
        // 6. Fill-in-the-Blank
        {
          question: 'The main difference between var, let, and const in JavaScript is _________.',
           type:'fill'
        },
        // 7. MCQ
        {
          question: 'Which one of these is a JavaScript framework?',
          options: ['React', 'HTML', 'CSS', 'Python']
        },
        // 8. MCQ
        {
          question: 'What is the correct syntax for creating a function in JavaScript?',
          options: ['function myFunction()', 'create function myFunction()', 'def myFunction()', 'function: myFunction()']
        },
        // 9. Fill-in-the-Blank
        {
          question: 'A block of code in JavaScript is called a ________.',
           type:'fill'
        },
        // 10. MCQ
        {
          question: 'Which of the following is a property of a JavaScript object?',
          options: ['length', 'key', 'value', 'method']
        },
        // 11. MCQ
        {
          question: 'Which of these HTML elements is used to define a list of options in a form?',
          options: ['<input>', '<select>', '<textarea>', '<option>']
        },
        // 12. Fill-in-the-Blank
        {
          question: 'A database that stores data in tables is called ________.',
           type:'fill'
        },
        // 13. MCQ
        {
          question: 'Which of the following is a valid HTML5 input type?',
          options: ['text', 'password', 'email', 'all of the above']
        },
        // 14. MCQ
        {
          question: 'What is the output of the following JavaScript code: console.log(2 + 2 * 2)?',
          options: ['6', '8', '4', 'Undefined']
        },
        // 15. Fill-in-the-Blank
        {
          question: 'JavaScript code is executed in a ________ environment.',
           type:'fill'
        },
        // 16. MCQ
        {
          question: 'Which of these is used to select an element by ID in JavaScript?',
          options: ['getElementById()', 'querySelector()', 'getElementByClassName()', 'getElementByTagName()']
        },
        // 17. MCQ
        {
          question: 'Which of the following is NOT a method to declare a variable in JavaScript?',
          options: ['var', 'let', 'const', 'define']
        },
        // 18. Fill-in-the-Blank
        {
          question: 'The method ________ is used to add an item to the end of an array in JavaScript.',
           type:'fill'
        },
        // 19. MCQ
        {
          question: 'Which HTML tag is used to display an image?',
          options: ['<img>', '<image>', '<picture>', '<src>']
        },
        // 20. MCQ
        {
          question: 'What does the acronym "CSS" stand for?',
          options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheet', 'Colorful Style Sheets']
        },
        // 21. Fill-in-the-Blank
        {
          question: 'A function in JavaScript is invoked when it is called using ________.',
           type:'fill'
        },
        // 22. MCQ
        {
          question: 'Write a JavaScript function to sort an array of numbers in ascending order.',
          options: ['sort()', 'filter()', 'reduce()', 'map()']
        },
        // 23. MCQ
        {
          question: 'What does the "console.log()" method do in JavaScript?',
          options: ['Logs a message to the console', 'Prints to the webpage', 'Throws an error', 'None of the above']
        },
        // 24. MCQ
        {
          question: 'Which of the following is used to add a comment in JavaScript?',
          options: ['//', '#', '/* */', 'All of the above']
        },// 25. MCQ
        {
          question: 'Which HTTP method is used to update existing data on a server?',
          options: ['GET', 'POST', 'PUT', 'DELETE']
        },
        // 26. Fill-in-the-Blank
        {
          question: 'The ________ attribute in HTML specifies alternative text for an image.',
          type: 'fill'
        },
        // 27. MCQ
        {
          question: 'Which keyword is used to declare a constant in JavaScript?',
          options: ['const', 'constant', 'var', 'let']
        },
        // 28. Fill-in-the-Blank
        {
          question: 'In CSS, the ________ property is used to change the text color.',
          type: 'fill'
        },
        // 29. MCQ
        {
          question: 'Which of the following is a JavaScript data type?',
          options: ['Number', 'Class', 'Module', 'Package']
        },
        // 30. Fill-in-the-Blank
        {
          question: 'The ________ tag in HTML is used to define an unordered list.',
          type: 'fill'
        },
        
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
