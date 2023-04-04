/* eslint-disable no-unused-vars */
const express = require("express")
const router = express.Router();
const auth = require('./routes/auth')
const checklist = require('./routes/checklist')
const profile = require('./routes/profile')

router.use("/api", auth)
router.use("/api/checklist", checklist)

// router.use("/api/profile", profile)

module.exports = router