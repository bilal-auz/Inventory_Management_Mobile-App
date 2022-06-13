const express = require("express");
const { addEgg } = require("../controllers/eggControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/addEggs", protect, addEgg);

module.exports = router;
