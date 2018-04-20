const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send("User Page");
});

router.get('/users/about', (req, res) => {
  res.send("User about");
});

module.exports = router;
