const Team = require("../models/teamModel");
const Project = require("../models/projectModel");

exports.validateProject = async (req, res) => {
    try {
        const { username, questionId, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team) {
             res.status(404).json({ error: "Team not found" });
             return;
        }
        let project = await Project.findOne({ questionId });
        if (!project) {
             res.status(400).json({ message: "Invalid project question!" });
             return;
        }
        let existingAttempt = team.projectValidated.find(q => q.questionId === questionId);

        if (existingAttempt && existingAttempt.validated) {
             res.status(400).json({ message: "Already validated this project!" });
             return;
        }

        if (answer !== project.correctAnswer) {
            res.status(400).json({ message: "Incorrect answer!" });
            return ;
        }

        if (!existingAttempt) {
            team.projectValidated.push({ questionId, validated: true });
            team.points += 5;
        } else {
            existingAttempt.validated = true;
        }

        team.lastSubmissionTime = new Date();
        await team.save();

        res.status(200).json({ message: "Project validated!", points: team.points });
        return ;

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
