var express = require("express");
var router = express.Router();

/* POST users login. */
router.post("/", function (req, res, next) {
  var userName = "admin";
  var password = "123";
  if (req.body.userName === userName && req.body.password === password) {
    res.status(200).send("respond with a resource LOGIN");
  } else {
      res.status(401).send("invalid login");
  }
});

module.exports = router;
