var redis = require('redis');

const createRoom = (io, roomId, serverName) => {
  const roomNamespace = io.of(`/${roomId}`);

  var sub = null;

  roomNamespace.on('connection', function (socket) {

    if (!sub) {
      sub = redis.createClient({host: 'redis', port: 6379});
      sub.subscribe(`rooms/${roomId}`);
    }

    socket.emit('my-name-is', `${serverName}, room: ${roomId}`);

    sub.on('message', (chanell, msg) => {
      let parsedMsg;
      try {
        parsedMsg = JSON.parse(msg);
        socket.emit('new message', {
          username: parsedMsg.user.name,
          message: parsedMsg.text
        });
      } catch (e) {
        console.error(e);
      }
    });

    return roomNamespace;
  })
};

module.exports = {
  createRoom,
};
