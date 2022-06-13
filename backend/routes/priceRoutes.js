const express = require("express");
const { getPrices } = require("../controllers/priceControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/getPrices", protect, getPrices);

module.exports = router;
