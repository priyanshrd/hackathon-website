const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },
  
  isTeamLead: { 
    type: Boolean, 
    default: false 
  },
});

const TeamSchema = new mongoose.Schema({
  teamName: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  members: { 
    type: [TeamMemberSchema], 
    required: true,
    validate: {
      validator: function(members) {
        // Ensure at least one team lead exists
        return members.some(member => member.isTeamLead);
      },
      message: "Team must have at least one team lead"
    }
  },
  transactionId: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  screenshot: { 
    type: String,
    required: true 
  },
  isRVCEStudent: {
    type: Boolean,
    default: false
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  },
});

// Automatically derive member count
TeamSchema.virtual("memberCount").get(function () {
  return this.members.length;
});

module.exports = mongoose.model("Team", TeamSchema);