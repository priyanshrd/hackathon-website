// Email sending endpoint
router.post("/send-email", async (req, res) => {
  try {
    const { email, subject, message, registrationId } = req.body;

    console.log(email);

    if (!email || !subject || !message) {
      return res.status(400).json({
        error: "Email, subject, and message are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const result = await sendEmail(email, subject, message, registrationId);
    res.json(result);
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      error: "Failed to send email",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;