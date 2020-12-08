const { db } = require('../util/firebase');
const config = require('../config/twilioConfig');

// Token functions
const { 
    chatToken, 
    videoToken, 
    voiceToken 
}  = require('../util/tokenFunctions');

// Response helper function
const sendTokenResponse = (token, res) => {

    // res.set('Content-Type', 'application/json');
    // return res.send(
    //     JSON.stringify({
    //         token: token.toJwt()
    //     })
    // )
    return res.send({
        body: 'macdawg'
    })
};

// Chat Tokens
exports.getChatToken = (req, res) => {

    // const identity = req.query.identity;
    // const token = chatToken(identity, config);
    const token = 'token'
    sendTokenResponse(token, res);
};

exports.postChatToken = (req, res) => {

    const identity = req.body.identity;
    const token = chatToken(identity, config);
};

// Video Tokens