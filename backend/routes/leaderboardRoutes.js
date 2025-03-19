const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// Route to get all teams sorted by points (Public Leaderboard)
router.get("/", leaderboardController.getLeaderboard);

module.exports = router;
