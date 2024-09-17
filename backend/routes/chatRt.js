const express = require('express');

const router = express.Router();
const chatCt = require('../Controller/chatCt');

router.post('/chat', chatCt.chatFn);

module.exports = router;
