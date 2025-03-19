const express = require("express");
const { validateReport } = require("../controllers/reportController");

const router = express.Router();

router.post("/validate", validateReport);

module.exports = router;
