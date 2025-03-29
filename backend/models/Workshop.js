const mongoose = require("mongoose");

const WorkshopUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    usn: { type: String }, // Optional field for RVCE students
    transactionId: { type: String, required: true },
    image: { type: String }, // Store image as Base64 string
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkshopUser", WorkshopUserSchema);
