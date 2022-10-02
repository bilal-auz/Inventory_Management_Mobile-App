const Farm = require("../models/farmModel");
const User = require("../models/userModel");

const addEggs = async (req, res) => {
  try {
    const data = { owner: req._id, eggs: req.body };
    const newEgg = await Farm.findById(
      { _id: data.eggs.farmId },
      { strict: false }

      // , owner: data.owner, submitted: false
      // {
      //   eggs_w1: data.eggs.eggs_w1,
      //   eggs_w2: data.eggs.eggs_w2,
      //   eggs_w3: data.eggs.eggs_w3,
      // },
      // { new: true }
    );

    if (newEgg.submitted) throw new Error("Already Added");

    if (!newEgg.submitted) {
      newEgg.submitted = true;
      newEgg.eggs_w1 = data.eggs.eggs_w1;
      newEgg.eggs_w2 = data.eggs.eggs_w2;
      newEgg.eggs_w3 = data.eggs.eggs_w3;
    }

    await newEgg.save();
    res.status(200).send(newEgg);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEggs = async (req, res) => {
  var totalEggs = await Farm.aggregate([
    {
      $group: {
        _id: null,
        total_eggs_w1: { $sum: "$eggs_w1" },
        total_eggs_w2: { $sum: "$eggs_w2" },
        total_eggs_w3: { $sum: "$eggs_w3" },
        total: { $sum: { $add: ["$eggs_w1", "$eggs_w2", "$eggs_w3"] } },
      },
    },
  ]);

  totalEggs = {
    total_eggs_w1: totalEggs[0].total_eggs_w1.toLocaleString("en"),
    total_eggs_w2: totalEggs[0].total_eggs_w2.toLocaleString("en"),
    total_eggs_w3: totalEggs[0].total_eggs_w3.toLocaleString("en"),
    total: totalEggs[0].total.toLocaleString("en"),
  };
  res.status(200).json(totalEggs);
};

const resetEggs = async (req, res) => {
  console.log(req);
  try {
    const resetEggs = await Farm.updateMany({
      $set: { eggs_w1: 0, eggs_w2: 0, eggs_w3: 0, submitted: false },
    });

    res.status(200).send("Eggs reset");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { addEggs, getEggs, resetEggs };
