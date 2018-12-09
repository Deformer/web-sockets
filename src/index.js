// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { initRooms } = require('./services/rooms');
const { port } = require('./config');

let roomsSockets;

server.listen(port, () => {

  initRooms(io)
    .then((rooms) => {
      roomsSockets = rooms;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  console.log('Server listening at port %d', port);
});



