const Team = require("../models/teamModel");
const Report = require("../models/reportModel");
const { Mutex } = require("async-mutex");

const teamMutex = new Mutex();

exports.validateReport = async (req, res) => {
    const release = await teamMutex.acquire(); // Lock the function

    try {
        const { username, questionNumber, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team) {
            release(); // Ensure lock is released
            return res.status(404).json({ error: "Team not found" });
        }

        let report = await Report.findOne({ questionNumber });
        if (!report) {
            release();
            return res.status(400).json({ message: "Invalid report question number!" });
        }

        let existingAttempt = team.reportValidated.find(q => q.questionNumber === questionNumber);
        if (existingAttempt) {
            release();
            return res.status(400).json({ message: "This question has already been validated." });
        }

        let updatedTeam = team; // Default to original team if no update occurs

        if (answer === report.correctAnswer) {
            updatedTeam = await Team.findOneAndUpdate(
                { username },
                {
                    $push: { reportValidated: { questionNumber, validated: true } },
                    $inc: { points: 2 },
                    $set: { lastSubmissionTime: new Date() }
                },
                { new: true }
            );
        }

        release(); // Release lock before sending response

        return res.status(200).json({
            message: "Report question validated!",
            points: updatedTeam.points
        });

    } catch (error) {
        console.error(error);
        release(); // Ensure lock is released in case of error
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
