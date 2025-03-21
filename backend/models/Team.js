const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10,15}$/, "Invalid phone number"],
  },
  isTeamLead: { type: Boolean, default: false },
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true, trim: true },
  members: { type: [TeamMemberSchema], required: true },
  transactionId: { type: String, required: true, unique: true, trim: true },
  screenshot: { type: String }, // Stores Base64 image
  registrationDate: { type: Date, default: Date.now },
});

// Automatically derive member count
TeamSchema.virtual("memberCount").get(function () {
  return this.members.length;
});

module.exports = mongoose.model("Team", TeamSchema);
