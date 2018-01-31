import * as restify from 'restify';
import * as builder from 'botbuilder';
import * as appTalk from "./app-talk";

var server =restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
})

var connector = new builder.ChatConnector ({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    let m = appTalk.App.Talk.GetGreeting(new Date());
    session.send(m);
    session.send("You said: %s", session.message.text);
});
