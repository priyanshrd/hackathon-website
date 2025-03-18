const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  idea: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Store file URL after uploading
});

module.exports = mongoose.model('Submission', SubmissionSchema);