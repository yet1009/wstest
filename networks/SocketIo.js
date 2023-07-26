const express = require('express');

// const redisPool = require('../middleware/RedisPool');
const { socketEmitter } = require('../utils/GroupEmitter')

const redis = require('socket.io-redis')

const app = express();
const http = require('http');

const server = http.createServer(app);
// const config = require('config');


const { Server } = require('socket.io');
const io = new Server(server);

// redisPool(io);

io.listen(4005);

io.adapter(redis({ host: 'localhost', port: 26379}))

io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
    console.log(',,,,,,,,,,,,,,')

    await socket.on('send_name', (msg) => {
        console.log(msg)
        let data = JSON.parse(msg)
        socket.emit('send_name', data['name']);
    })

})



