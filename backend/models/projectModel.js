const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("Project", projectSchema);
