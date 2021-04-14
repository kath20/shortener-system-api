const express = require('express');
const router = express.Router();

/* GET shortcut. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource GETSHORTCUT');
});

module.exports = router;
