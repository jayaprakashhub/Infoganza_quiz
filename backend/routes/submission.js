// const express = require('express');
// const router = express.Router();
// const Submission = require('../models/submission.js');

// // POST /api/start — Register user & create submission
// router.post('/start', async (req, res) => {
//   const { name, registerNumber, college } = req.body;

//   // Check if all required fields are provided
//   if (!name || !registerNumber || !college) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Create a new submission document
//     const submission = new Submission({
//       name,
//       registerNumber,
//       college
//     });

//     // Save the submission to the database
//     const savedSubmission = await submission.save();

//     // Respond with success and the submission ID
//     res.status(200).json({
//       message: 'User registered',
//       id: savedSubmission._id
//     });
//   } catch (err) {
//     // Log the error for better debugging
//     console.error('Error during registration:', err);
    
//     // Send a server error response with the error details
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// });

// // PUT /api/submit/:id — Submit answers, score & time
// router.put('/submit/:id', async (req, res) => {
//   const { answers, timeTaken } = req.body;
//   const { id } = req.params;

//   // Define the correct answers for all questions
  
//   const correctAnswers = [
//     'Hyper Text Markup Language', // Question 1
//     'CSS', // Question 2
//     'Python Script', // Question 3
//     'Cascading Style Sheets', // Question 4
//     'PHP', // Question 5
//     'scope and reassignability', // Question 6
//     'React', // Question 7
//     'function myFunction()', // Question 8
//     'function', // Question 9
//     'value', // Question 10
//     '<select>', // Question 11
//     'relational database', // Question 12
//     'all of the above', // Question 13
//     '6', // Question 14
//     'browser', // Question 15
//     'getElementById()', // Question 16
//     'define', // Question 17
//     'push', // Question 18
//     '<img>', // Question 19
//     'Cascading Style Sheets', // Question 20
//     'parentheses', // Question 21
//     'sort()', // Question 22
//     'Logs a message to the console', // Question 23
//     'All of the above', // Question 24
//   ];
  
//   // Validate submission data
//   if (!Array.isArray(answers) || answers.length !== 24 || typeof timeTaken !== 'number') {
//     return res.status(400).json({ error: 'Invalid submission data' });
//   }

//   // Calculate score by comparing user's answers with correct answers
//   // let score = 0;
//   // answers.forEach((ans, i) => {
//   //   if (ans.trim().toUpperCase() === correctAnswers[i].trim().toUpperCase()) {
//   //     score++;
//   //   }
//   // });
//   let score = 0;
//   answers.forEach((ans, i) => {
//     // Ensure the answer is a string before trimming
//     const normalizedAns = ans && typeof ans === 'string' ? ans.trim().toLowerCase() : '';
//     const normalizedCorrectAnswer = correctAnswers[i].trim().toLowerCase();
  
//     // Compare the normalized answers
//     if (normalizedAns === normalizedCorrectAnswer) {
//       score++;
//     }
//   });
  


//   try {
//     // Find the submission by ID and update it with the answers, score, and time taken
//     const updatedSubmission = await Submission.findByIdAndUpdate(
//       id,
//       { answers, score, timeTaken },
//       { new: true }
//     );

//     // If the submission was not found, return a 404 error
//     if (!updatedSubmission) {
//       return res.status(404).json({ error: 'Submission not found' });
//     }

//     // Respond with the updated submission details
//     res.status(200).json({
//       message: 'Submission updated successfully',
//       updated: updatedSubmission
//     });
//   } catch (err) {
//     // Log the error for better debugging
//     console.error('Error during submission update:', err);
    
//     // Send a server error response with the error details
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// });


// // GET /api/results — Admin only
// router.get('/results', async (req, res) => {
//   try {
//     const submissions = await Submission.find().sort({ score: -1, timeTaken: 1 });
//     res.status(200).json(submissions);
//   } catch (err) {
//     console.error('Error fetching results:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const Submission = require('../models/submission.js');

// POST /api/start — Register user & create submission
router.post('/start', async (req, res) => {
  const { name, registerNumber, college, year } = req.body;

  // Check if all required fields are provided
  if (!name || !registerNumber || !college || !year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate the year (ensure it's one of the predefined options)
  const validYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  if (!validYears.includes(year)) {
    return res.status(400).json({ error: 'Invalid year' });
  }

  try {
    const existingSubmission = await Submission.findOne({ registerNumber });
    if (existingSubmission) {
      return res.status(400).json({ error: 'Register number already exists' });
    }
    // Create a new submission document including the year
    const submission = new Submission({
      name,
      registerNumber,
      college,
      year  // Add year to the submission
    });

    // Save the submission to the database
    const savedSubmission = await submission.save();

    // Respond with success and the submission ID
    res.status(200).json({
      message: 'User registered',
      id: savedSubmission._id
    });
  } catch (err) {
    // Log the error for better debugging
    console.error('Error during registration:', err);
    
    // Send a server error response with the error details
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// PUT /api/submit/:id — Submit answers, score & time
router.put('/submit/:id', async (req, res) => {
  const { answers, timeTaken } = req.body;
  const { id } = req.params;

  // Define the correct answers for all questions
  const correctAnswers = [
    'Hyper Text Markup Language', // Question 1
    'CSS', // Question 2
    'Python Script', // Question 3
    'Cascading Style Sheets', // Question 4
    'PHP', // Question 5
    'scope and reassignability', // Question 6
    'React', // Question 7
    'function myFunction()', // Question 8
    'function', // Question 9
    'value', // Question 10
    '<select>', // Question 11
    'relational database', // Question 12
    'all of the above', // Question 13
    '6', // Question 14
    'browser', // Question 15
    'getElementById()', // Question 16
    'define', // Question 17
    'push', // Question 18
    '<img>', // Question 19
    'Cascading Style Sheets', // Question 20
    'parentheses', // Question 21
    'sort()', // Question 22
    'Logs a message to the console', // Question 23
    'All of the above', // Question 24
  ];
  
  // Validate submission data
  if (!Array.isArray(answers) || answers.length !== 24 || typeof timeTaken !== 'number') {
    return res.status(400).json({ error: 'Invalid submission data' });
  }

  // Calculate score by comparing user's answers with correct answers
  let score = 0;
  answers.forEach((ans, i) => {
    const normalizedAns = ans && typeof ans === 'string' ? ans.trim().toLowerCase() : '';
    const normalizedCorrectAnswer = correctAnswers[i].trim().toLowerCase();
  
    if (normalizedAns === normalizedCorrectAnswer) {
      score++;
    }
  });

  try {
    // Find the submission by ID and update it with the answers, score, and time taken
    const updatedSubmission = await Submission.findByIdAndUpdate(
      id,
      { answers, score, timeTaken },
      { new: true }
    );

    // If the submission was not found, return a 404 error
    if (!updatedSubmission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Respond with the updated submission details
    res.status(200).json({
      message: 'Submission updated successfully',
      updated: updatedSubmission
    });
  } catch (err) {
    console.error('Error during submission update:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/results — Admin only
router.get('/results', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ score: -1, timeTaken: 1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
