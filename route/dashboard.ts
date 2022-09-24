import express = require("express");
const router = express.Router();

router.get("", (_, res) => {
  res.send("Dashboard backend");
});

module.exports = router;
