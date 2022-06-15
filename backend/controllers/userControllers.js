const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const Farm = require("../models/farmModel");

const login = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) return res.sendStatus(400).send("Fill all fields");

  const user = await User.findOne({ userId });

  if (user && user.password == password) {
    res.status(201).send({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      cin: user.cin,
      companyName: user.companyName,
      authorizationNumber: user.authorizationNumber,
      ANPO_ID: user.ANPO_ID,
      farms: user.farms,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid Login");
  }
};

const register = async (req, res) => {
  // console.log(req.body.firstName);

  // return res.sendStatus(200);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    companyName,
    authorizationNumber,
    ANPO_ID,
  } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    companyName,
    authorizationNumber,
    ANPO_ID,
  });

  if (newUser) {
    console.log(newUser);
    res.status(201).json({
      newUser,
    });
  } else {
    res.status(400).send("Error Creating User");
  }
};

const addFarm = async (req, res) => {
  const { farmName, owner, eggs_w1, eggs_w2, eggs_w3 } = req.body;

  const newFarm = await Farm.create({
    farmName,
    owner,
    eggs_w1,
    eggs_w2,
    eggs_w3,
  });

  if (newFarm) {
    await User.findByIdAndUpdate(owner, { $push: { farms: newFarm._id } });

    res.status(201).json({ newFarm });
  } else {
    res.status(400).send("Error Creating Farm");
  }
};

module.exports = { login, register, addFarm };
