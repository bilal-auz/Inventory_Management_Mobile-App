const express = require("express");

const router = express.Router();

const {
  login,
  register,
  addFarm,
  verifyTokenUser,
} = require("../controllers/userControllers");

router.post("/login", login);
router.post("/register", register);
router.post("/addFarm", addFarm);
router.post("/verifyToken", verifyTokenUser);

module.exports = router;
