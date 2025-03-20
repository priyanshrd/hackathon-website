
 // Load environment variables at the top
const dotenv= require('dotenv')
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Team = require('../models/Team');

dotenv.config()

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

    // Create and save the team
    const team = new Team({
      teamName,
      memberCount,
      members,
      transactionId
    });

    const savedTeam = await team.save();
    console.log('Team registered successfully:', savedTeam._id);

    // Send email to the team lead
    const teamLead = members.find(member => member.isTeamLead);
    if (teamLead && teamLead.email) {
      await sendRegistrationEmail(teamLead.email, teamName);
    }

    res.status(201).json({
      message: 'Team registered successfully',
      teamId: savedTeam._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Function to send registration email
const sendRegistrationEmail = async (email, teamName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Hackathon Registration Confirmation',
      text: `Thank you for registering your team "${teamName}" for the hackathon. We are excited to have you participate!
      
    Best regards,  
    The Hackathon Team`
    };
    

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = router;