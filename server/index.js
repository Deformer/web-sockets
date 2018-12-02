// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const { createRoom } = require('./createRoom');

var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown';


server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
app.use(express.static(__dirname + '/public'));

const roomsList = [1, 2];
const rooms = {};

for (const room of roomsList) {
  rooms[room] = createRoom(io, room, serverName);
}

