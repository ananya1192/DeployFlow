const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "DeployFlow API",
    version: "1.0.1",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;