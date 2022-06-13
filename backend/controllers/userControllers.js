const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

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
      farmName: user.farmName,
      companyName: user.companyName,
      authorizationNumber: user.authorizationNumber,
      ANPO_ID: user.ANPO_ID,
      eggs_w1: user.eggs_w1,
      eggs_w2: user.eggs_w2,
      eggs_w3: user.eggs_w3,
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
    farmName,
    companyName,
    authorizationNumber,
    ANPO_ID,
    eggs_w1,
    eggs_w2,
    eggs_w3,
  } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    cin,
    farmName,
    companyName,
    authorizationNumber,
    ANPO_ID,
    eggs_w1,
    eggs_w2,
    eggs_w3,
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

module.exports = { login, register };