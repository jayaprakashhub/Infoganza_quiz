// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Replace this with your actual correct answers array (30 answers expected)
// const correctAnswers = [
//   'Hyper Text Markup Language', // Question 1
//   'CSS', // Question 2
//   'Python Script', // Question 3
//   'Cascading Style Sheets', // Question 4
//   'PHP', // Question 5
//   'scope and reassignability', // Question 6
//   'React', // Question 7
//   'function myFunction()', // Question 8
//   'function', // Question 9
//   'value', // Question 10
//   '<select>', // Question 11
//   'relational database', // Question 12
//   'all of the above', // Question 13
//   '6', // Question 14
//   'browser', // Question 15
//   'getElementById()', // Question 16
//   'define', // Question 17
//   'push', // Question 18
//   '<img>', // Question 19
//   'Cascading Style Sheets', // Question 20
//   'parentheses', // Question 21
//   'sort()', // Question 22
//   'Logs a message to the console', // Question 23
//   'All of the above', // Question 24
// ];
// const AdminResults = () => {
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     axios.get('/api/results')
//       .then(res => setSubmissions(res.data))
//       .catch(err => console.error('Error loading results:', err));
//   }, []);

//  return (
//   <div className="p-6 max-w-7xl mx-auto">
//     <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">All Quiz Submissions</h2>

//     {submissions.length === 0 ? (
//       <p className="text-center text-gray-600">No submissions found.</p>
//     ) : (
//       <>
//         <div className="overflow-x-auto shadow rounded-lg">
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Rank</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Name</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Year</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Register No</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">College</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Score</th>
//                 <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Time Taken</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions
//                 .sort((a, b) => {
//                   if (b.score === a.score) {
//                     return a.timeTaken - b.timeTaken; // Less time better
//                   }
//                   return b.score - a.score; // Higher score better
//                 })
//                 .map((submission, index) => (
//                   <tr key={submission._id} className="hover:bg-gray-50">
//                     <td className="py-3 px-4 border-b text-center">{index + 1}</td>
//                     <td className="py-3 px-4 border-b">{submission.name}</td>
//                     <td className="py-3 px-4 border-b">{submission.year}</td>
//                     <td className="py-3 px-4 border-b">{submission.registerNumber}</td>
//                     <td className="py-3 px-4 border-b">{submission.college}</td>
//                     <td className="py-3 px-4 border-b text-center font-semibold">{submission.score} / 30</td>
//                     <td className="py-3 px-4 border-b text-center">{submission.timeTaken}s</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-10">
//   <h3 className="text-2xl font-semibold mb-4 text-blue-600">Detailed Answers</h3>
//   {submissions.map((submission, index) => (
//     <div key={submission._id} className="mb-8 p-6 border rounded-xl shadow bg-white">
//       <h4 className="text-lg font-bold mb-2">{index + 1}. {submission.name} ({submission.registerNumber})</h4>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//         {submission.answers.map((ans, i) => {
//           // Normalize both the answer and correct answer to lowercase for case-insensitive comparison
//           const userAnswer = ans?.trim().toLowerCase();
//           const correctAnswer = correctAnswers[i]?.trim().toLowerCase();

//           return (
//             <div
//               key={i}
//               className={`p-3 rounded-md text-sm border ${
//                 userAnswer === correctAnswer
//                   ? 'bg-green-100 border-green-400'
//                   : 'bg-red-100 border-red-400'
//               }`}
//             >
//               <strong>Q{i + 1}:</strong> {ans} 
//               {userAnswer !== correctAnswer && correctAnswers[i] && (
//                 <span className="text-gray-600">(Correct: {correctAnswers[i]})</span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   ))}
// </div>

//       </>
//     )}
//   </div>
// );

// };

// export default AdminResults;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

  const correctAnswers = [
  'LLaMA 3', // Q1
  '360 m', // Q2
  'Harvey', // Q3
  '44.55', // Q4
  'Facilitating communication between AI agents', // Q5
  'Rs. 26,620', // Q6
  'IBM', // Q7
  '6', // Q8
  'Helsing', // Q9
  'Electricity consumption exceeding 8% of national usage', // Q10
  '48,400', // Q11
  'Federated Learning', // Q12
  'Claude 3', // Q13
  'Gemini 2.0 Flash', // Q14
  'Generative AI', // Q15
  'Bridgewater Associates', // Q16
  'Amazon', // Q17
  'Assuming breach and verifying all access', // Q18
  'Quantum Error Correction', // Q19
  'Creating biometric identification systems', // Q20
  'AI Safety Summit Charter', // Q21
  'LLaMA 3', // Q22
  'TxGemma', // Q23
  'Decoding dolphin communication using AI', // Q24
  'Understanding and executing natural language instructions in 3D environments', // Q25
  'Superscalar relies on compiler optimization, SMT provides thread-level parallelism', // Q26
  'Determining if a Turing machine halts on a given input', // Q27
  'O(n)', // Q28
  'Resource preemption', // Q29
  'Gradients become extremely small in early layers, slowing down learning' // Q30
];


const AdminResults = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('/api/results');
      setSubmissions(res.data);
    } catch (err) {
      console.error('Error loading results:', err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await axios.delete(`/api/delete/${id}`);
        fetchSubmissions(); // Refresh the list
      } catch (err) {
        console.error('Error deleting submission:', err);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) {
      try {
        await axios.delete('/api/delete-all');
        fetchSubmissions(); // Refresh the list
      } catch (err) {
        console.error('Error deleting all submissions:', err);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">All Quiz Submissions</h2>

      {submissions.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDeleteAll}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete All Submissions
          </button>
        </div>
      )}

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Rank</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Year</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Register No</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">College</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Score</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Time Taken</th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-gray-700 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions
                  .sort((a, b) => {
                    if (b.score === a.score) return a.timeTaken - b.timeTaken;
                    return b.score - a.score;
                  })
                  .map((submission, index) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border-b text-center">{index + 1}</td>
                      <td className="py-3 px-4 border-b">{submission.name}</td>
                      <td className="py-3 px-4 border-b">{submission.year}</td>
                      <td className="py-3 px-4 border-b">{submission.registerNumber}</td>
                      <td className="py-3 px-4 border-b">{submission.college}</td>
                      <td className="py-3 px-4 border-b text-center font-semibold">{submission.score} / 30</td>
                      <td className="py-3 px-4 border-b text-center">{submission.timeTaken}s</td>
                      <td className="py-3 px-4 border-b text-center">
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">Detailed Answers</h3>
            {submissions.map((submission, index) => (
              <div key={submission._id} className="mb-8 p-6 border rounded-xl shadow bg-white">
                <h4 className="text-lg font-bold mb-2">{index + 1}. {submission.name} ({submission.registerNumber})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {submission.answers.map((ans, i) => {
                    const userAnswer = ans?.trim().toLowerCase();
                    const correctAnswer = correctAnswers[i]?.trim().toLowerCase();

                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-md text-sm border ${
                          userAnswer === correctAnswer
                            ? 'bg-green-100 border-green-400'
                            : 'bg-red-100 border-red-400'
                        }`}
                      >
                        <strong>Q{i + 1}:</strong> {ans} 
                        {userAnswer !== correctAnswer && correctAnswers[i] && (
                          <span className="text-gray-600">(Correct: {correctAnswers[i]})</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminResults;
