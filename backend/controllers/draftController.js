const Team = require("../models/teamModel");
const Draft = require("../models/draftModel");

exports.validateDraft = async (req, res) => {
    try {
        const { username, questionId, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        let draft = await Draft.findOne({ questionId });
        if (!draft) {
            res.status(400).json({ message: "Invalid draft question!" });
            return ;
        }
        let existingAttempt = team.draftValidated.find(q => q.questionId === questionId);

        if (existingAttempt && existingAttempt.validated) {
            console.log(answer);
            console.log(draft.correctAnswer);
            res.status(400).json({ message: "Already validated this draft!" });
            return ;
        }

        if (answer !== draft.correctAnswer) {
            console.log(answer);
            console.log(draft.correctAnswer);
             res.status(400).json({ message: "Incorrect answer!" });
             return;
        }

        if (!existingAttempt) {
            team.draftValidated.push({ questionId, validated: true });
            team.points += 5;
        } else {
            existingAttempt.validated = true;
        }

        team.lastSubmissionTime = new Date();
        await team.save();

         res.status(200).json({ message: "Draft validated!", points: team.points });
         return;

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
