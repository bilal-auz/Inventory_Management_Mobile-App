const User = require("../models/userModel");
const { getEggs } = require("./eggControllers");
const {
  getPrice_w1,
  getPrice_w2,
  getPrice_w3,
} = require("../helpers/getPriceHelper");
const Farm = require("../models/farmModel");

const getPrices = async (req, res) => {
  //   const {
  //     total_eggs_w1: w1,
  //     total_eggs_w2: w2,
  //     total_eggs_w3: w3,
  //   } = await User.aggregate([
  //     {
  //       $group: {
  //         _id: null,
  //         total_eggs_w1: { $sum: "$eggs_w1" },
  //         total_eggs_w2: { $sum: "$eggs_w2" },
  //         total_eggs_w3: { $sum: "$eggs_w3" },
  //         total: { $sum: { $add: ["$eggs_w1", "$eggs_w2", "$eggs_w3"] } },
  //       },
  //     },
  //   ])[0];

  //   res.status(200).send(prices);

  const {
    total_eggs_w1: w1,
    total_eggs_w2: w2,
    total_eggs_w3: w3,
  } = await Farm.aggregate([
    {
      $group: {
        _id: null,
        total_eggs_w1: { $sum: "$eggs_w1" },
        total_eggs_w2: { $sum: "$eggs_w2" },
        total_eggs_w3: { $sum: "$eggs_w3" },
        total: { $sum: { $add: ["$eggs_w1", "$eggs_w2", "$eggs_w3"] } },
      },
    },
  ]).then((val) => val[0]);

  const prices = {
    price_w1: getPrice_w1(w1),
    price_w2: getPrice_w2(w2),
    price_w3: getPrice_w3(w3),
  };

  res.status(200).json(prices);
};

module.exports = { getPrices };
