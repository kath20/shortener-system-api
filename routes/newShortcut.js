var express = require('express');
var router = express.Router();

/* POST shortcut creation. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource NEW SHORT CUT');
});

module.exports = router;
