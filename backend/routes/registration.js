const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const WorkshopUser = require("../models/Workshop");
const sendEmail = require("../utils/mailer");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper function to validate email format
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Helper function to validate phone number
const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

// Workshop registration endpoint
router.post("/workshop", upload.single("screenshot"), async (req, res) => {
  try {
    const { name, email, phoneNumber, transactionId } = req.body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !transactionId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate phone number
    if (!validatePhone(phoneNumber)) {
      return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    // Check for existing user
    const existingUser = await WorkshopUser.findOne({ $or: [{ email }, { transactionId }] });
    if (existingUser) {
      const conflictField = existingUser.email === email ? "email" : "transaction ID";
      return res.status(409).json({ 
        error: `User with this ${conflictField} already exists`,
        field: conflictField
      });
    }

    // Process screenshot
    if (!req.file) {
      return res.status(400).json({ error: "Payment screenshot is required" });
    }

    const newUser = new WorkshopUser({
      name,
      email,
      phoneNumber,
      transactionId,
      image: req.file.buffer.toString("base64"),
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      userId: newUser._id
    });

  } catch (error) {
    console.error("Workshop registration error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation failed",
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      error: "Registration failed",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Team registration endpoint
router.post("/register", upload.single("screenshot"), async (req, res) => {
  try {
    let { teamName, members, transactionId, isRVCEStudent = false } = req.body;

    // Validate required fields
    if (!teamName || !members || !transactionId) {
      return res.status(400).json({ error: "Team name, members, and transaction ID are required" });
    }

    // Parse members if it's a string
    try {
      if (typeof members === "string") {
        members = JSON.parse(members);
      }
    } catch (err) {
      return res.status(400).json({ error: "Invalid team member details format" });
    }

    // Validate members array
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "Members must be an array" });
    }

    // Validate each team member
    for (const [index, member] of members.entries()) {
      if (!member.name || !member.email || !member.phoneNumber) {
        return res.status(400).json({ 
          error: `Member ${index + 1} is missing required fields`,
          memberIndex: index
        });
      }

      if (!validateEmail(member.email)) {
        return res.status(400).json({ 
          error: `Invalid email format for member ${index + 1}`,
          memberIndex: index
        });
      }

      if (!validatePhone(member.phoneNumber)) {
        return res.status(400).json({ 
          error: `Phone number must be 10 digits for member ${index + 1}`,
          memberIndex: index
        });
      }

      
    }

    // Check for existing team or transaction ID
    const existingTeam = await Team.findOne({ 
      $or: [{ teamName }, { transactionId }] 
    });
    
    if (existingTeam) {
      const conflictField = existingTeam.teamName === teamName ? "team name" : "transaction ID";
      return res.status(409).json({ 
        error: `Team with this ${conflictField} already exists`,
        field: conflictField
      });
    }

    // Validate screenshot
    if (!req.file) {
      return res.status(400).json({ error: "Payment screenshot is required" });
    }

    const newTeam = new Team({
      teamName,
      members,
      transactionId,
      isRVCEStudent,
      screenshot: req.file.buffer.toString("base64"),
    });

    const savedTeam = await newTeam.save();

    res.status(201).json({
      message: "Team registration successful",
      teamId: savedTeam._id,
      memberCount: savedTeam.members.length
    });

  } catch (error) {
    console.error("Team registration error:", error);
    
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ 
        error: `${duplicateField} already exists`,
        field: duplicateField
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: "Validation failed",
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      error: "Team registration failed",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all teams endpoint
router.get("/teams", async (req, res) => {
  try {
    const includeScreenshots = req.query.includeScreenshots === 'true';
    
    let teamsQuery = Team.find({});
    
    if (!includeScreenshots) {
      teamsQuery = teamsQuery.select("-screenshot");
    }
    
    const teams = await teamsQuery.lean();
      
    res.json({
      count: teams.length,
      teams
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ 
      error: "Failed to fetch teams",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get transaction screenshots endpoint
router.get("/screenshots", async (req, res) => {
  try {
    const users = await WorkshopUser.find(
      {},
      "name email phoneNumber transactionId image"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({ 
        message: "No transaction screenshots found" 
      });
    }

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    console.error("Error fetching screenshots:", error);
    res.status(500).json({ 
      error: "Failed to fetch transaction screenshots",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Email sending endpoint
router.post("/send-email", async (req, res) => {
  try {
    const { uid, email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ 
        error: "Email, subject, and message are required" 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const result = await sendEmail(uid, email, subject, message);
    res.json(result);

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      error: "Failed to send email",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;