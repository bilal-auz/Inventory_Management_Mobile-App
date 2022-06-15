const mongoose = require("mongoose");

const farmSchema = mongoose.Schema(
  {
    farmName: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    eggs_w1: { type: Number, required: true },
    eggs_w2: { type: Number, required: true },
    eggs_w3: { type: Number, required: true },
    submitted: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
