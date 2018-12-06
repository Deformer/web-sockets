// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const { initRooms } = require('./services/rooms');

var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown';


let roomsSockets;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
  console.log('Hello, I\'m %s, how can I help?', serverName);
});

initRooms(io)
  .then((rooms) => {
    roomsSockets = rooms;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Routing
app.use(express.static(__dirname + '/public'));



