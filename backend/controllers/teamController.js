const Team = require("../models/teamModel");

// Register a new team
exports.registerTeam = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const existingTeam = await Team.findOne({ username });

        if (existingTeam) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const team = new Team({ username, password, email });
        await team.save();
        res.status(201).json({ message: "Team registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login team
exports.loginTeam = async (req, res) => {
    try {
        const { username, password } = req.body;
        const team = await Team.findOne({ username });

        if (!team) {
            res.status(401).json({ message: "Invalid username" });
            return ;
        }

        if (team.password !== password) {
             res.status(401).json({ message: "Invalid password" });
             return;
        }

        res.status(200).json({ message: "Login successful", team });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update team points
exports.updatePoints = async (req, res) => {
    try {
        const { username, points } = req.body;
        const team = await Team.findOne({ username });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        team.points += points;
        team.lastSubmissionTime = new Date();
        await team.save();

        res.status(200).json({ message: "Points updated successfully", team });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
