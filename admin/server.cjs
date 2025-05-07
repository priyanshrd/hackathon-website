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

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  overallRating: { type: Number, required: true, min: 0, max: 3 },
  eventRatings: {
    preHackWorkshop: { type: Number, min: 0, max: 3 },
    ideationRound: { type: Number, min: 0, max: 3 },
    hackathon: { type: Number, min: 0, max: 3 },
    finalPitch: { type: Number, min: 0, max: 3 }
  },
  mentoringQuality: { type: Number, min: 0, max: 3 },
  organizerSupport: { type: Number, min: 0, max: 3 },
  venueQuality: { type: Number, min: 0, max: 3 },
  judgingFairness: { type: Number, min: 0, max: 3 },
  quickFeedback: String,
  continueSupport: { type: Boolean, default: true },
  contactPermission: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Team = mongoose.model('Team', teamSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Team Routes
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
    const scores = req.body.scores;
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { 
        score: totalScore,
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

// Feedback Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      message: err.message || 'Failed to submit feedback' 
    });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const { sortBy = 'createdAt', sortOrder = 'desc', limit } = req.query;
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const query = Feedback.find().sort(sortOptions);
    
    if (limit) {
      query.limit(parseInt(limit));
    }

    const feedback = await query.exec();
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to fetch feedback' 
    });
  }
});

app.delete('/api/feedback', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid feedback IDs provided' 
      });
    }

    const result = await Feedback.deleteMany({ _id: { $in: ids } });
    
    res.json({ 
      success: true, 
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message || 'Failed to delete feedback' 
    });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));