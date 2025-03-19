const express = require("express");
const { validateDraft } = require("../controllers/draftController");

const router = express.Router();

router.post("/validate", validateDraft);

module.exports = router;
