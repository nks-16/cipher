const Team = require("../models/teamModel");

// Get leaderboard (All teams sorted by points in descending order)
exports.getLeaderboard = async (req, res) => {
    try {
        const teams = await Team.find({}, "username points")
            .sort({ points: -1 }) // Sorting in descending order
            .exec();

        res.status(200).json({ leaderboard: teams });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
