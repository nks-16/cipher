const Team = require("../models/teamModel");
const Email = require("../models/emailModel");

exports.validateEmail = async (req, res) => {
    try {
        const { username, questionId, answer } = req.body;

        let team = await Team.findOne({ username });
        if (!team){
            res.status(404).json({ error: "Team not found" });
            return ;
        } 

        let email = await Email.findOne({ questionId });
        if (!email) {
             res.status(400).json({ message: "Invalid email question!" });
             return;
        }
        let existingAttempt = team.emailValidated.find(q => q.questionId === questionId);

        if (existingAttempt && existingAttempt.validated) {
             res.status(200).json({ message: "Already validated this email!" });
             return;
        }

        if (answer !== email.correctAnswer) {
            console.log(answer);
             console.log(email.correctAnswer);
             res.status(400).json({ message: "Incorrect answer!" });
             return;
        }

        if (!existingAttempt) {
            team.emailValidated.push({ questionId, validated: true });
            team.points += 5;
        } else {
            existingAttempt.validated = true;
        }

        team.lastSubmissionTime = new Date();
        await team.save();

        res.status(200).json({ message: "Email validated!", points: team.points });
        return ;

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
