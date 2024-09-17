const express = require('express');

const router = express.Router();

router.use('/regLoginRt', require('./regLoginRt'));
module.exports = router;
