const mongoose = require("mongoose");

const cipherSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    correctAnswer: { type: String, required: true }
});

module.exports = mongoose.model("Cipher", cipherSchema);
