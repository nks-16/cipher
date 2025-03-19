const express = require("express");
const { validateProject } = require("../controllers/projectController");

const router = express.Router();

router.post("/validate", validateProject);

module.exports = router;
