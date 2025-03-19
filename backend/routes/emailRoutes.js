const express = require("express");
const { validateEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/validate", validateEmail);

module.exports = router;
