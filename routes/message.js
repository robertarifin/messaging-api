'use strict';

const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');

router.get('/:messageId', messageController.getOneMessage);
router.post('/', messageController.sendMessage);
router.get('/', messageController.getAllMessage);

module.exports = router;
