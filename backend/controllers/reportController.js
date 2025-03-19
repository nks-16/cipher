const Team = require("../models/teamModel");
const Report = require("../models/reportModel");
const { Mutex } = require('async-mutex');

const teamMutex = new Mutex();

exports.validateReport = async (req, res) => {
    const release = await teamMutex.acquire(); // Lock the function

    try {
        const { username, questionNumber, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        let report = await Report.findOne({ questionNumber });
        if (!report) {
            return res.status(400).json({ message: "Invalid report question number!" });
        }

        let existingAttempt = team.reportValidated.find(q => q.questionNumber === questionNumber);
        if (existingAttempt) {
            return res.status(400).json({ message: "This question has already been validated." });
        }

        // Atomic update
        const updatedTeam = await Team.findOneAndUpdate(
            { username },
            {
                $push: { reportValidated: { questionNumber, validated: true } },
                $inc: { points: 5 },
                $set: { lastSubmissionTime: new Date() }
            },
            { new: true }
        );

        return res.status(200).json({ message: "Report question validated!", points: updatedTeam.points });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        release(); // Release the lock after the function is done
    }
};
