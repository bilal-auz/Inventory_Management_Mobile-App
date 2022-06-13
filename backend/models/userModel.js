const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cin: { type: String, required: true },
    farmName: { type: String, required: true },
    companyName: { type: String, required: true },
    authorizationNumber: { type: String, required: true },
    ANPO_ID: { type: String, required: true },
    eggs_w1: { type: Number, required: true },
    eggs_w2: { type: Number, required: true },
    eggs_w3: { type: Number, required: true },
    userId: { type: String, required: false },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
