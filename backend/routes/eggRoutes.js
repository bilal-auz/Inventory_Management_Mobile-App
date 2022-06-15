const express = require("express");
const { addEggs, getEggs } = require("../controllers/eggControllers");
const { protect, protectFarms } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/addEggs", protect, addEggs);
router.get("/getEggs", protect, getEggs);

module.exports = router;
