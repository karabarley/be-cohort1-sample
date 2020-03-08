const express = require("express");

const { healthRouter } = require('../routes/health/health.router')
const { groupsRouter } = require('../routes/groups/groups.router')

const router = express.Router();
// Top-level resource routes
router.use("/health", healthRouter);
router.use("/groups", groupsRouter);

module.exports = router;
