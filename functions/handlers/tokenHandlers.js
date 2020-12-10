const { db } = require('../util/firebase');
const config = require('../config/twilioConfig');

// Token functions
const { videoToken }  = require('../util/tokenFunctions');

// Response helper function
const sendTokenResponse = (token, res) => {

    res.set('Content-Type', 'application/json');
    return res.send(
        JSON.stringify({
            token: token.toJwt()
        })
    )
};

// Chat Tokens
exports.getVideoToken = (req, res) => {

    console.log('identity: ', req,query.identity)
    const identity = req.query.identity;
    const token = chatToken(identity, config);
    sendTokenResponse(token, res);
};

exports.postVideoToken = (req, res) => {

    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    console.log('handler token: ', token);
    sendTokenResponse(token, res)
};

