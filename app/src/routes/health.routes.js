const express = require("express");
const packageInfo = require("../../package.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "DeployFlow API",
    version: packageInfo.version,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;