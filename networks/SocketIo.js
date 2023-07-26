const express = require('express');

const { createClient } = require('redis');
const Redis = require('ioredis')



const { createAdapter } = require('@socket.io/redis-adapter')

const app = express();
const http = require('http');

const server = http.createServer(app);
// const config = require('config');


const { Server } = require('socket.io');
const io = new Server(server);

const _url = 'redis://127.0.0.1:26379'
const pubClient = createClient({url: _url});
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

server.listen(4005);

io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
    console.log(',,,,,,,,,,,,,,')

    await socket.on('send_name', (msg) => {
        console.log(msg)
        let data = JSON.parse(msg)

        const redisClient = new Redis(_url)
        console.dir(redisClient);
        // socket.broadcast.emit('send_name', data['name']);
    })

})



