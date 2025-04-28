// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const RegisterPage = ({ setUserInfo, setSubmissionId }) => {
//   const [form, setForm] = useState({ name: '', registerNumber: '', college: '', agreed: false });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.agreed || !form.name || !form.registerNumber || !form.college) {
//       alert('Please complete all fields and agree to the guidelines.');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const res = await axios.post('http://localhost:5001/api/start', {
//         name: form.name,
//         registerNumber: form.registerNumber,
//         college: form.college,
//       });

//       if (res.status === 200 && res.data.id) {
//         setUserInfo({ name: form.name, registerNumber: form.registerNumber, college: form.college });
//         setSubmissionId(res.data.id);
//         navigate('/quiz');
//       } else {
//         alert('Failed to register.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       alert('Server error during registration.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
//           Infoganza_2k25 Technical Quiz
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             name="name"
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           />
//           <input
//             name="registerNumber"
//             type="text"
//             placeholder="Register Number"
//             value={form.registerNumber}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           />
//           <input
//             name="college"
//             type="text"
//             placeholder="College Name"
//             value={form.college}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           />
  
//           <div className="bg-blue-50 p-4 rounded-lg text-sm">
//             <p className="font-semibold mb-2">Quiz Guidelines:</p>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               <li>30 Questions</li>
//               <li>Timer will start when quiz begins</li>
//               <li>No page refresh or navigation allowed during quiz</li>
//             </ul>
//           </div>
  
//           <label className="flex items-center text-sm">
//             <input
//               type="checkbox"
//               name="agreed"
//               checked={form.agreed}
//               onChange={handleChange}
//               className="mr-2 accent-blue-500"
//             />
//             I agree to the guidelines
//           </label>
  
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300"
//           >
//             {isSubmitting ? 'Registering...' : 'Start Quiz'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
  
// };

// export default RegisterPage;

/////
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ setUserInfo, setSubmissionId }) => {
  const [form, setForm] = useState({
    name: '',
    registerNumber: '',
    college: '',
    year: '',
    agreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreed || !form.name || !form.registerNumber || !form.college || !form.year) {
      alert('Please complete all fields and agree to the guidelines.');
      return;
    }
  
    setIsSubmitting(true);
    try {
      const res = await axios.post('/api/start', {
        name: form.name,
        registerNumber: form.registerNumber,
        college: form.college,
        year: form.year,
      });
  
      if (res.status === 200 && res.data.id) {
        setUserInfo({
          name: form.name,
          registerNumber: form.registerNumber,
          college: form.college,
          year: form.year,
        });
        setSubmissionId(res.data.id);
        navigate('/quiz');
      } else {
        alert('Failed to register.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.status === 400 && err.response.data.error === 'Register number already exists') {
        alert('Register number already exists. Please use a different register number.');
      } else {
        alert('Server error during registration.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Infoganza_2k25 Technical Quiz
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            name="registerNumber"
            type="text"
            placeholder="Register Number"
            value={form.registerNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            name="college"
            type="text"
            placeholder="College Name"
            value={form.college}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">Quiz Guidelines:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>30 Questions</li>
              <li>Timer will start when quiz begins</li>
              <li>No page refresh or navigation allowed during quiz</li>
            </ul>
          </div>

          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              className="mr-2 accent-blue-500"
            />
            I agree to the guidelines
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300"
          >
            {isSubmitting ? 'Registering...' : 'Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const RegisterPage = ({ setUserInfo, setSubmissionId }) => {
//   const [form, setForm] = useState({ name: '', registerNumber: '', college: '', agreed: false });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.agreed || !form.name || !form.registerNumber || !form.college) {
//       alert('Please complete all fields and agree to the guidelines.');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const res = await axios.post('http://localhost:5001/api/start', {
//         name: form.name,
//         registerNumber: form.registerNumber,
//         college: form.college,
//       });

//       if (res.status === 200 && res.data.id) {
//         setUserInfo({ name: form.name, registerNumber: form.registerNumber, college: form.college });
//         setSubmissionId(res.data.id);
//         navigate('/quiz');
//       } else {
//         alert('Failed to register.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       alert('Server error during registration.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full space-y-6">
//         <h1 className="text-3xl font-extrabold text-blue-600 text-center">Infoganza_2k25 Technical Quiz</h1>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             name="name"
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//             required
//           />
//           <input
//             name="registerNumber"
//             type="text"
//             placeholder="Register Number"
//             value={form.registerNumber}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//             required
//           />
//           <input
//             name="college"
//             type="text"
//             placeholder="College Name"
//             value={form.college}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//             required
//           />

//           <div className="bg-blue-100 p-5 rounded-xl text-sm text-gray-700">
//             <p className="font-semibold mb-2">Quiz Guidelines:</p>
//             <ul className="list-disc ml-5 space-y-1">
//               <li>30 Questions</li>
//               <li>Timer will start when quiz begins</li>
//               <li>No page refresh or navigation allowed during quiz</li>
//             </ul>
//           </div>

//           <label className="flex items-center text-gray-700">
//             <input
//               type="checkbox"
//               name="agreed"
//               checked={form.agreed}
//               onChange={handleChange}
//               className="mr-2 rounded focus:ring-blue-400"
//             />
//             I agree to the guidelines
//           </label>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition transform hover:scale-105"
//           >
//             {isSubmitting ? 'Registering...' : 'Start Quiz'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
