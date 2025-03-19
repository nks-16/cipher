const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("Draft", draftSchema);
