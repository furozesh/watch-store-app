const express = require("express");
const router = express.Router();

const {
  incrementVisit,
  getStats,
} = require("../controllers/statsController");

router.post("/visit", incrementVisit);

router.get("/", getStats);

module.exports = router;