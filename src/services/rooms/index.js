const redis = require('redis');
const { Room } = require('database-module/models');

const { redis: { host, port } } = require('../../config');

const createWSRoom = (io, roomId) => {
  const roomNamespace = io.of(`/${roomId}`);

  let sub = null;

  roomNamespace.on('connection', function (socket) {

    if (!sub) {
      sub = redis.createClient({ host, port });
      sub.subscribe(`rooms/${roomId}`);
    }

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

const getRoomsList = () => Room.findAll();
// const getRoomsList = () => Promise.resolve([{ id:1 },{ id:2 },{ id:3 }]);

const initRooms = (io) => getRoomsList()
  .then((rooms) => rooms.reduce((dict, room) => {
    dict[room.id] = createWSRoom(io, room.id);
    return dict;
  }, {}));

module.exports = {
  initRooms,
};
