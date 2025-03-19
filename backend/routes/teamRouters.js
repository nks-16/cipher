const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

// Route for registering a team
router.post("/register", teamController.registerTeam);

// Route for logging in a team
router.post("/login", teamController.loginTeam);

// Route for updating points
router.post("/update-points", teamController.updatePoints);

module.exports = router;
