const Farm = require("../models/farmModel");
const User = require("../models/userModel");

const addEggs = async (req, res) => {
  const data = { owner: req._id, eggs: req.body };

  await Farm.findOneAndUpdate(
    { _id: data.eggs.farmId, owner: data.owner },
    {
      eggs_w1: data.eggs.eggs_w1,
      eggs_w2: data.eggs.eggs_w2,
      eggs_w3: data.eggs.eggs_w3,
    }
  );

  res.status(200).send(data);
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

  res.status(200).json(totalEggs[0]);
};

module.exports = { addEggs, getEggs };
