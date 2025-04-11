const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://acmgdghack:nohack194@cluster0.rv58u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Team Schema
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: [{
    name: String,
    email: String,
    phoneNumber: String,
    isTeamLead: Boolean
  }],
  transactionId: { type: String, required: true, unique: true },
  isSelected: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  comments: String,
  registrationDate: { type: Date, default: Date.now }
});

const Team = mongoose.model('Team', teamSchema);

// Routes
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find({ isSelected: true });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/teams/:id', async (req, res) => {
  try {
    // Calculate total score from the scores object
    const scores = req.body.scores; // Receive scores object from frontend
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { 
        score: totalScore, // Store only the total score as number
        comments: req.body.comments || ''
      },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ 
      message: err.message || 'Failed to update team'
    });
  }
});
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));