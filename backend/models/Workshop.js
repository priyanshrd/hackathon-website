const mongoose = require("mongoose");

const WorkshopUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  transactionId: { type: String, required: true },
  image: { type: String }, // Store image as Base64 string
});

module.exports = mongoose.model("WorkshopUser", WorkshopUserSchema);
