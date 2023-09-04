const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, "Your mobile is required"],
  },
  otp: {
    type: String,
    required: [true, "Your otp is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("OTP",otpSchema);