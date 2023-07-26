const express = require('express');

// const redisPool = require('../middleware/RedisPool');
const { socketEmitter } = require('../utils/GroupEmitter')

const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter')

const app = express();
const http = require('http');

const server = http.createServer(app);
// const config = require('config');


const { Server } = require('socket.io');
const io = new Server(server);

// redisPool(io);
const pubClient = createClient({url: 'redis://localhost:26379'});
const subClient = pubClient.duplicate();


//
// const __redisConnect = () => {
//     pubClient.connect().catch(err => {
//         console.error('Redis Error : ', err)
//         setTimeout(() => {
//             __redisConnect()
//         }, 5000)
//     })
// }
//
// __redisConnect()

io.adapter(createAdapter(pubClient, subClient));
server.listen(4005);

io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
    console.log(',,,,,,,,,,,,,,')

    await socket.on('send_name', (msg) => {
        console.log(msg)
        let data = JSON.parse(msg)
        socket.broadcast.emit('send_name', data['name']);
    })

})



