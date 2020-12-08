// Twilio stuff
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { ChatGrant, VideoGrant, VoiceGrant } = AccessToken;

// Token Generator
exports.generateToken = (config) => {
    return new AccessToken(
        config.twilio.accountSid,
        config.twilio.apiKey,
        config.twilio.apiSecret
    )
};

// Token functions
exports.videoToken = (identity, room, config) => {
    
    let videoGrant;
    if (typeof room !== 'undefined') {
        videoGrant = new VideoGrant({ room });
    } else {
        videoGrant = new VideoGrant();
    };
    const token = generateToken(config);
    token.addGrant(videoGrant);
    token.identity = identity;
    return token;
};

// exports.chatToken = (identity, config) => {

//     const chatGrant = new ChatGrant({
//         serviceSid: config.twilio.chatService
//     });
//     const token = generateToken(config);
//     token.addGrant(chatGrant);
//     token.identity = identity;
//     return token;
// };



// exports.voiceToken = (identity, config) => {

//     let voiceGrant;
//     if (typeof config.twilio.outgoingApplicationSid !== 'undefined') {
//         voiceGrant = new VoiceGrant({
//             outgoingApplicationSid: config.twilio.outgoingApplicationSid,
//             incomingAllow: config.twilio.incomingAllow
//         });
//     } else {
//         voiceGrant = new VoiceGrant({
//             incomingAllow: config.twilio.incomingAllow
//         })
//     };
//     const token = generateToken(config);
//     token.addGrant(voiceGrant);
//     token.identity = identity;
//     return token;
// };