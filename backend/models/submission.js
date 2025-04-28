// const mongoose = require('mongoose');

// const submissionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   registerNumber: {
//     type: String,
//     required: true
//   },
//   college: {
//     type: String,
//     required: true
//   },
//   answers: {
//     type: [String],
//     default: []
//   },
//   score: {
//     type: Number,
//     default: 0
//   },
//   timeTaken: {
//     type: Number,
//     default: 0 // in seconds
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Submission', submissionSchema);
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registerNumber: {
    type: String,
    unique: true,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,  // Make sure this is required if you need the year information
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'], // Example, you can adjust the options based on your needs
  },
  answers: {
    type: [String],
    default: []
  },
  score: {
    type: Number,
    default: 0
  },
  timeTaken: {
    type: Number,
    default: 0 // in seconds
  }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
