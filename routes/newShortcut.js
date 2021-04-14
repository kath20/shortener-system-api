const express = require('express');
const router = express.Router();

/* POST shortcut creation. */
router.post('/', function(req, res, next) {
  res.send('respond with a resource NEW SHORT CUT');
});

module.exports = router;
