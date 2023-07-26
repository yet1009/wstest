const EventEmitter = require('eventemitter3')


class RedisEmitter extends EventEmitter {}
class SocketEmitter extends EventEmitter {}

const redisEmitter = new RedisEmitter();
const socketEmitter = new SocketEmitter();




module.exports = {
    redisEmitter,
    socketEmitter,
}