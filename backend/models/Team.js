const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isTeamLead: { type: Boolean, default: false }
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  memberCount: { type: Number, required: true },
  members: [TeamMemberSchema],
  transactionId: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema); 