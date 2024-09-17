const express = require('express');

const router = express.Router();

router.use('/regLoginRt', require('./regLoginRt'));
router.use('/productDataRt', require('./productDataRt'));
module.exports = router;
