'use strict';

const Message = require('../models/message');
const messageTypeConst = require('../constants/messageType');

const WebSocket = require("ws");

const broadcast = (clients, message) => {
    if (!clients) {
        message['status'] = messageTypeConst.FAILED;

        Message.create(message).then((data) => {
            return false
        })
        .catch((err) => {
            return false
        })
    }

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.content);
        }
    });

    return true;
};

module.exports = {
    sendMessage(req, res) {
        let content = req.body.content;

        if (!content) {
            res.status(404).json( {
                err: 'content cannot be null'
            })
        }

        let message = {};
        message['status'] = messageTypeConst.SUCCESS;
        message['content'] = content;

        //to check if there is any connected web socket client and
        //broadcast the message to the clients
        let isConnectionOn = broadcast(req.app.locals.clients, message);

        if (!isConnectionOn) {
            res.status(404).json({
                err: 'No client connected!',
                msg: 'Need a websocket connection from client'
            })

            return ;
        }

        Message.create(message).then((data) => {
            res.status(201).json({
                msg: 'successfully send message',
                data: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                err: 'Failed to save message to db',
                msg: 'please try again!'
            })
        })
    },

    getOneMessage(req, res) {
        let id = req.params.messageId;

        Message.findById(id)
        .then((data) => {
            res.status(200).json({
                data: data,
                msg: 'success get data'
            })
        })
        .catch((err) => {
            res.status(500).json({
                err: 'Failed to get message',
                msg: 'please try again!'
            })
        })
    },

    getAllMessage(req, res) {
        Message.find({
            status: messageTypeConst.SUCCESS
        })
        .then((data) => {
            res.status(200).json({
                data: data,
                msg: 'success get data'
            })
        })
        .catch((err) => {
            res.status(500).json({
                err: 'Failed to get messages',
                msg: 'please try again!'
            })
        })
    }
}
