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
  'Hyper Text Markup Language', 'CSS', 'Python Script', 'Cascading Style Sheets', 'PHP',
  'scope and reassignability', 'React', 'function myFunction()', 'function', 'value',
  '<select>', 'relational database', 'all of the above', '6', 'browser',
  'getElementById()', 'define', 'push', '<img>', 'Cascading Style Sheets',
  'parentheses', 'sort()', 'Logs a message to the console', 'All of the above',
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
                      <td className="py-3 px-4 border-b text-center font-semibold">{submission.score} / 24</td>
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
