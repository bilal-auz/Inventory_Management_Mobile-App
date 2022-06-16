const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const Farm = require("../models/farmModel");
const verifyToken = require("../helpers/verifyToken");

const login = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    res.status(400);
    throw new Error("Fill all fields");
  }

  const user = await User.findOne({ userId }).populate("farms");

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
    res.status(401);
    throw new Error("Wrong Login Credentials");
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
  const { farmName, owner, eggs_w1, eggs_w2, eggs_w3, submitted } = req.body;

  const newFarm = await Farm.create({
    farmName,
    owner,
    eggs_w1,
    eggs_w2,
    eggs_w3,
    submitted,
  });

  if (newFarm) {
    await User.findByIdAndUpdate(owner, { $push: { farms: newFarm._id } });

    res.status(201).json({ newFarm });
  } else {
    res.status(400).send("Error Creating Farm");
  }
};

const verifyTokenUser = (req, res) => {
  console.log(req.body);
  const { token } = req.body;

  if (!token) return res.status(400).send("missing token");

  const decoded = verifyToken(token);

  if (!decoded) res.status(200).send(false);

  res.status(200).send(decoded);
};

module.exports = { login, register, addFarm, verifyTokenUser };
