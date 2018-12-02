var redis = require('redis');


var pub = redis.createClient({ host: 'redis', port: 6379 });

// setInterval(() => pub.publish('rooms//room1', 'HELLO'), 5000);