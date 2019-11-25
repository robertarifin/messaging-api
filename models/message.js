'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    content: String,
    status: String,
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
