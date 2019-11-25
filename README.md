# Send Message

Return a json object of the message

* __URL__

    /api/messages

* __Method:__

    `POST`

* __URL Params__

    __Required:__

    `None`

* __Data Params__

    `{"content": ${content}

* __Success Response:__

    * __Code:__ 201 CREATED

        __Content:__ `{msg: 'successfully send message', data: ${message}}`

* __Error Response:__

    * __Code:__ 500 INTERNAL SERVER ERROR

        __Content__: `{err: 'Failed to save message to db',
                msg: 'please try again!'}`

    * __Code:__ 400 BAD REQUEST

        __Content__: `{err: 'No client connected!',
                msg: 'Need a websocket connection from client'}`


* __Notes:__
        A message is only sent when there is ws client connected to it. Message is
        stored whether websocket client is connected or not.

# Get all successful messages

Return an array of object of all successful messages

* __URL__

    /api/messages

* __Method:__

    `GET`

* __URL Params__

    __Required:__

    None

* __Data Params__

    None

* __Success Response:__

    * __Code:__ 200

        __Content:__ `{data: ${messages}, msg: 'success get data'}`

* __Error Response:__

    * __Code:__ 500 INTERNAL SERVER ERROR

        __Content__: `{err: 'Failed to get message',
                msg: 'please try again!'}`

* __Notes:__
        Only successful messages that are sent to ws clients will be shown
        as responses


# Get a single message

Return an json object of an message

* __URL__

    /api/messages/:messageId

* __Method:__

    `GET`

* __URL Params__

    __Required:__

    `None`

* __Data Params__

    None

* __Success Response:__

    * __Code:__ 200

        __Content:__ `{data: ${message}, msg: 'success get data'}`

* __Error Response:__

    * __Code:__ 500 INTERNAL SERVER ERROR

        __Content__: `{
                err: 'Failed to get message',
                msg: 'please try again!'
            })}`

* __Notes:__
        Data will be `null` if the message does not exist
