const express = require("express");

const router = express.Router();

const { login, register, addFarm } = require("../controllers/userControllers");

router.post("/login", login);
router.post("/register", register);
router.post("/addFarm", addFarm);

module.exports = router;
