import express = require("express");
const router = express.Router();

router.get("", (_, res) => {
  res.send("Blog backend");
});

module.exports = router;
