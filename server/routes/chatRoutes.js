const express = require('express');
const { RegisterUser } = require('../controllers/createUser');
const { AccessChatsOrCreateChat, AccessChatInbox } = require('../controllers/createChat');
const { SendMessage } = require('../controllers/sendMessage');
const { FetchMessages } = require('../controllers/getMessages');
const router = express.Router();

router.post('/adduser', RegisterUser);
router.post('/createoraccesschat', AccessChatsOrCreateChat);
router.post('/accesschat', AccessChatInbox);
router.post('/sendmessage', SendMessage);
router.get('/fetchmessages/:chatId', FetchMessages);

module.exports = router;
