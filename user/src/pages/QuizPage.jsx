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
    question: 'Which AI model, released in 2025, is optimized to run efficiently on a single GPU?',
    options: ['Gemma 3', 'GPT-NeoX', 'LLaMA 3', 'Falcon 180B']
  },
  // 2. MCQ
  {
    question: 'A train running at 90 km/hr crosses a platform in 36 seconds. If the length of the train is 240 meters, what is the length of the platform?',
    options: ['440 m', '320 m', '360 m', '300 m']
  },
  // 3. MCQ
  {
    question: 'Which AI-powered system is currently revolutionizing legal document analysis and contract review in 2025?',
    options: ['LexiAI', 'Harvey', 'LawBot', 'LegalMind']
  },
  // 4. MCQ
  {
    question: 'The average of 20 numbers is 45. Later it was found that a number 56 was misread as 65. Find the correct average.',
    options: ['44.55', '44.95', '44.65', '44.85']
  },
  // 5. MCQ
  {
    question: 'What is the purpose of the Agent-to-Agent (A2A) protocol being developed by Salesforce and Google?',
    options: ['Facilitating communication between AI agents', 'Enhancing data encryption standards', 'Streamlining cloud storage solutions', 'Automating customer service responses']
  },
  // 6. MCQ
  {
    question: 'A man invested Rs. 20,000 at compound interest of 10% per annum. What will be the amount after 3 years?',
    options: ['Rs. 26,620', 'Rs. 26,400', 'Rs. 27,000', 'Rs. 26,800']
  },
  // 7. MCQ
  {
    question: 'Which company is leading the development of AI agents capable of collaborating autonomously in enterprise environments?',
    options: ['Accenture', 'IBM', 'Oracle', 'SAP']
  },
  // 8. MCQ
  {
    question: 'A can complete a piece of work in 18 days, B in 15 days. They start together, but after 6 days B leaves. How many more days will A take to finish the work?',
    options: ['6', '5', '4', '3']
  },
  // 9. MCQ
  {
    question: 'Which defense tech startup is utilizing AI and satellite data to transform modern warfare in Europe?',
    options: ['Helsing', 'Palantir', 'Anduril', 'Darktrace']
  },
  // 10. MCQ
  {
    question: 'What significant challenge is associated with powering AI data centers by 2030?',
    options: ['Shortage of skilled personnel', 'High water consumption', 'Electricity consumption exceeding 8% of national usage', 'Limited availability of rare earth metals']
  },
  // 11. MCQ
  {
    question: 'The population of a town increases at the rate of 10% per annum. If its population was 40,000 two years ago, what is the present population?',
    options: ['48,400', '48,000', '46,800', '49,000']
  },
  // 12. MCQ
  {
    question: 'Which AI technique is being increasingly used in 2025 for privacy-preserving machine learning?',
    options: ['Reinforcement Learning', 'Federated Learning', 'Backpropagation', 'Generative Adversarial Networks']
  },
  // 13. MCQ
  {
    question: 'Which AI model introduced in 2025 is designed for real-time reasoning by pausing to "think" before responding?',
    options: ['GPT-5', 'Gemini 2.5', 'Claude 3', 'PaLM-X']
  },
  // 14. MCQ
  {
    question: 'Which AI model is known for its ability to generate both images and audio as of 2025?',
    options: ['GPT-4', 'Gemini 2.0 Flash', 'DALL·E 3', 'Whisper 2']
  },
  // 15. MCQ
  {
    question: 'Which technology trend is expected to revolutionize personalized medicine by 2025?',
    options: ['Blockchain', 'Quantum Computing', 'Generative AI', 'Internet of Things (IoT)']
  },
  // 16. MCQ
  {
    question: "Which hedge fund's CTO emphasized the importance of human judgment in AI-driven investment strategies in 2025?",
    options: ['Bridgewater Associates', 'Citadel', 'Renaissance Technologies', 'Two Sigma']
  },
  // 17. MCQ
  {
    question: 'Which company faced criticism in 2025 for its plan to display tariff-related costs on product listings?',
    options: ['eBay', 'Amazon', 'Walmart', 'Alibaba']
  },
  // 18. MCQ
  {
    question: 'What is a key feature of Zero Trust Architecture (ZTA) in cybersecurity?',
    options: ['Trusting all internal network traffic', 'Assuming breach and verifying all access', 'Relying solely on perimeter defenses', 'Allowing unrestricted access to trusted users']
  },
  // 19. MCQ
  {
    question: 'What breakthrough allows quantum computers in 2025 to maintain qubit stability longer, aiding practical problem-solving?',
    options: ['Zero-Kelvin Cooling', 'Quantum Tunneling Enhancement', 'Quantum Error Correction', 'Cryogenic Entanglement']
  },
  // 20. MCQ
  {
    question: 'What is the focus of the AI startup "World" launched by Sam Altman in 2025?',
    options: ['Developing AI for space exploration', 'Creating biometric identification systems', 'Enhancing virtual reality experiences', 'Building AI-powered financial tools']
  },
  // 21. MCQ
  {
    question: 'What major global initiative launched in 2025 aims to regulate AI development across nations?',
    options: ['Global AI Accord', 'UN-AI Pact', 'AI Safety Summit Charter', 'OECD Tech Treaty']
  },
  // 22. MCQ
  {
    question: 'Which 2025 AI model by Meta is optimized for open-source collaboration and research in language models?',
    options: ['OPT-3', 'BlenderBot 5', 'LLaMA 3', 'FAIRNet']
  },
  // 23. MCQ
  {
    question: 'Which AI model developed by Google in 2025 is designed to assist in therapeutic development?',
    options: ['MedGemma', 'TxGemma', 'BioGemma', 'HealthGemma']
  },
  // 24. MCQ
  {
    question: "What is the primary function of Google's DolphinGemma project launched in 2025?",
    options: ['Enhancing underwater drone navigation', 'Decoding dolphin communication using AI', 'Monitoring marine pollution levels', 'Developing aquatic-themed virtual assistant']
  },
  // 25. MCQ
  {
    question: 'What is the primary goal of the AI model SIMA introduced by DeepMind?',
    options: ['Automating data center operations', 'Enhancing language translation services', 'Understanding and executing natural language instructions in 3D environments', 'Developing AI for autonomous vehicles']
  },
  // 26. MCQ
  {
    question: 'In the context of modern CPU design, what is the main trade-off between superscalar execution and simultaneous multithreading (SMT)?',
    options: ['Superscalar provides higher clock speed, SMT increases pipeline depth', 'Superscalar improves cache locality, SMT increases instruction-level parallelism', 'Superscalar relies on compiler optimization, SMT provides thread-level parallelism', 'Superscalar executes multiple instructions from different threads, SMT executes one thread per cycle']
  },
  // 27. MCQ
  {
    question: 'Which of the following problems is undecidable by a Turing machine?',
    options: ['Determining if a string belongs to a regular language', 'Determining if a context-free grammar is ambiguous', 'Determining if a Turing machine halts on a given input', 'Finding the shortest path in a graph with positive weights']
  },
  // 28. MCQ
  {
    question: 'What is the worst-case time complexity of building a binary heap from an unsorted array of n elements?',
    options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)']
  },
  // 29. MCQ
  {
    question: 'In distributed systems, which condition is NOT necessary for a deadlock to occur?',
    options: ['Mutual exclusion', 'Circular wait', 'Resource preemption', 'Hold and wait']
  },
  // 30. MCQ
  {
    question: 'In deep learning, what does "gradient vanishing" refer to in training deep neural networks?',
    options: ['The gradient magnitude becomes too large, destabilizing weights', 'The gradient becomes zero due to overfitting', 'Gradients become extremely small in early layers, slowing down learning', 'The model fails to converge due to data imbalance']
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
