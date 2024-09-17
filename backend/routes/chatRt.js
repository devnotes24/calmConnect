const express = require('express');

const router = express.Router();
const chatCt = require('../Controller/chatCt');

router.get('/getChat',chatCt.sendChatsToUser);
router.post('/sendPrompt', chatCt.generateChatCompletion);
router.delete('/clearChat',chatCt.deleteChats)

module.exports = router;
