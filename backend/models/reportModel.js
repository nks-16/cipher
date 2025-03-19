const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    questionNumber: { type: Number, required: true, unique: true }, // 1 to 6
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("Report", reportSchema);
