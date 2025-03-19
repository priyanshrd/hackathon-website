const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamId: { type: String, required: true, unique: true },
  idea: { type: String, required: true },
  submissionTime: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },

});

module.exports = mongoose.model('Submission', SubmissionSchema);