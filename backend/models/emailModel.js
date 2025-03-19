const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("Email", emailSchema);
