const express = require("express");
const router = express.Router();
const Submission = require("../../backend/models/Submission");

router.post("/", async (req, res) => {
  const { teamName, idea, fileUrl } = req.body;
  try {
    const submission = new Submission({ teamName, idea, fileUrl });
    await submission.save();
    res.status(201).json({ message: "Submission saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save submission" });
  }
});

module.exports = router;
