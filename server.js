var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var cors = require('cors');
//var https = require('https');
var http = require('http');
var { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

var PORT = process.env.PORT || 8000;

// Fill the appID and appCertificate key given by Agora.io
var appID = process.env.AGORA_APP_ID;
var appCertificate = process.env.AGORA_APP_CERTIFICATE;

// token expire time, hardcode to 3600 seconds = 1 hour
var expirationTimeInSeconds = 3600 * 24 // 24 hours
var role = RtcRole.PUBLISHER

var app = express();
app.disable('x-powered-by');
app.set('port', PORT);
app.use(express.favicon());
app.use(app.router);
app.use(cors());

var generateRtcToken = function(req, resp) {
    var currentTimestamp = Math.floor(Date.now() / 1000)
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    var channelName = req.query.channelName;
    var uid = Math.floor(Math.random() * 230) + 1;

    if (!channelName) {
        return resp.status(400).json({ 'error': 'channel name is required' }).send();
    }

    var token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

    resp.header("Access-Control-Allow-Origin", "*")
        //resp.header("Access-Control-Allow-Origin", "http://ip:port")
    return resp.json({ 'token': token, 'uid': uid }).send();
};

var generateRtmToken = function(req, resp) {
    var currentTimestamp = Math.floor(Date.now() / 1000)
    var privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    var account = req.query.account;
    if (!account) {
        return resp.status(400).json({ 'error': 'account is required' }).send();
    }

    var key = RtmTokenBuilder.buildToken(appID, appCertificate, account, RtmRole, privilegeExpiredTs);

    resp.header("Access-Control-Allow-Origin", "*")
        //resp.header("Access-Control-Allow-Origin", "http://ip:port")
    return resp.json({ 'key': key }).send();
};

app.get('/rtcToken', generateRtcToken);
app.get('/rtmToken', generateRtmToken);

http.createServer(app).listen(app.get('port'), function() {
    console.log('VideoPorteroSignServer starts at ' + app.get('port'));
});

//https.createServer(credentials, app).listen(app.get('port') + 1, function() {
//    console.log('AgoraSignServer starts at ' + (app.get('port') + 1));
//});