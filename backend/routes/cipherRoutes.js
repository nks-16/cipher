const express = require("express");
const { validateCipher } = require("../controllers/cipherController");

const router = express.Router();

router.post("/validate", validateCipher);

module.exports = router;
