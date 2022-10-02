const express = require("express");
const {
  addEggs,
  getEggs,
  resetEggs,
} = require("../controllers/eggControllers");
const { protect, protectFarms } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/addEggs", protect, addEggs);
router.get("/getEggs", protect, getEggs);
router.put("/resetEggs", protect, resetEggs); //problem with protected route

module.exports = router;
