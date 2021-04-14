const express = require("express");
const router = express.Router();

/* POST users login. */
router.post("/", function (req, res, next) {
  const userName = "admin";
  const password = "123";
  if (req.body.userName === userName && req.body.password === password) {
    res.status(200).send("respond with a resource LOGIN");
  } else {
      res.status(401).send("invalid login");
  }
});

module.exports = router;
