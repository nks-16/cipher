const Team = require("../models/teamModel");
const Cipher = require("../models/cipherModel");

exports.validateCipher = async (req, res) => {
    try {
       
        const { username, questionId, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        let cipher = await Cipher.findOne({ questionId });
        if (!cipher) {
            res.status(400).json({ message: "Invalid cipher question!" });
            return;
        }
        let existingAttempt = team.cipherValidated.find(q => q.questionId === questionId);

        if (existingAttempt && existingAttempt.validated) {
            res.status(400).json({ message: "Already validated this cipher!" });
            return;
        }
        console.log(answer);
        console.log(cipher.correctAnswer);
        if (answer !== cipher.correctAnswer) {
            res.status(400).json({ message: "Incorrect answer!" });
            return;
        }

        if (!existingAttempt) {
            team.cipherValidated.push({ questionId, validated: true });
            team.points += 5; // Adjust points as needed
        } else {
            existingAttempt.validated = true;
        }

        team.lastSubmissionTime = new Date();
        await team.save();

        res.status(200).json({ message: "Cipher validated!", points: team.points });
        return ;

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
