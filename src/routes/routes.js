const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const mainRoutes = require("./mainRoutes");

// Use auth routes for signup and login
router.use("/", authRoutes);

// Use main routes for other endpoints
router.use("/", mainRoutes);

module.exports = router;
