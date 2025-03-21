const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const WorkshopUser = require("../models/Workshop");
const sendEmail = require("../utils/mailer");

const multer = require("multer");

// Use multer to store files in memory (as buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/workshop", upload.single("screenshot"), async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phoneNumber, transactionId } = req.body;
    console.log("Received registration request:", { name, transactionId });
    console.log(req.file);

    // Check if user already exists
    const alreadyRegistered = await WorkshopUser.findOne({ email });
    if (alreadyRegistered) {
      console.log("User already exists:", alreadyRegistered.email);
      return res.status(400).json({ error: "User email already exists" });
    }

    // Convert image to Base64
    let imageBase64 = null;
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    // Create a new user
    const newUser = new WorkshopUser({
      name,
      email,
      phoneNumber,
      transactionId,
      image: imageBase64, // Store the image in Base64 format
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all transaction screenshots
router.get("/screenshots", async (req, res) => {
  try {
    const users = await WorkshopUser.find({}, "name email transactionId image"); // Only fetch relevant fields

    console.log(users);

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: "No transaction screenshots found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching transaction screenshots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", upload.single("screenshot"), async (req, res) => {
  try {
    let { teamName, members, transactionId } = req.body;

    console.log("Received registration request:", { teamName });

    if (typeof members === "string") {
      try {
        members = JSON.parse(members); // Convert to an array
      } catch (err) {
        console.log("Error parsing members:", err);
        return res.status(400).json({ error: "Invalid team member details" });
      }
    }

    if (!Array.isArray(members) || members.length === 0) {
      console.log("Invalid members array:", members);
      return res.status(400).json({ error: "Invalid team member details" });
    }

    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      console.log("Team name already exists:", teamName);
      return res.status(400).json({ error: "Team name already exists" });
    }

    let imageBase64 = null;
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    const team = new Team({
      teamName,
      members,
      transactionId,
      screenshot: imageBase64,
    });

    const savedTeam = await team.save();
    console.log("Team registered successfully:", savedTeam._id);

    res.status(201).json({
      message: "Team registered successfully",
      teamId: savedTeam._id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const result = await sendEmail(email, subject, message);
  res.json(result);
});

module.exports = router;
