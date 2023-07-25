const express = require('express');


const redisPool = require('../middleware/RedisPool');

const app = express();
const http = require('http');

const server = http.createServer(app);
// const config = require('config');

const { Server } = require('socket.io');
const io = new Server(server);

redisPool(app);

io.listen(4005);

io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
    console.log(',,,,,,,,,,,,,,')

    await socket.on('send_name', (msg) => {
        console.log(msg)
        io.emit('이름 출력 해줄게 ~~~~~', msg);
    })
})



