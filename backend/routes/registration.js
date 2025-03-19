const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.post('/register', async (req, res) => {
  try {
    const { teamName, memberCount, members, transactionId } = req.body;
    
    console.log('Received registration request:', { teamName, memberCount });

    // Validate team name uniqueness
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      console.log('Team name already exists:', teamName);
      return res.status(400).json({ error: 'Team name already exists' });
    }

    // Validate member count
    if (members.length !== memberCount) {
      console.log('Member count mismatch:', { expected: memberCount, received: members.length });
      return res.status(400).json({ error: 'Member count does not match provided members' });
    }

    // Create and save team
    const team = new Team({
      teamName,
      memberCount,
      members,
      transactionId
    });

    const savedTeam = await team.save();
    console.log('Team registered successfully:', savedTeam._id);

    res.status(201).json({ 
      message: 'Team registered successfully', 
      teamId: savedTeam._id 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a route to get all teams (for admin purposes)
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 