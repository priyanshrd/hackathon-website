const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const options = {
    amount: 50000, // Amount in paise (e.g., 50000 = ₹500)
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.json(order);
});

module.exports = router;
