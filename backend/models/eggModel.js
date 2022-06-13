const mongoose = require("mongoose");

const EggSchema = mongoose.Schema(
  {
    count: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Egg = mongoose.model("Egg", EggSchema);

module.exports = Egg;
