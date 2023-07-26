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

const port = 4005;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});


io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
    console.log(',,,,,,,,,,,,,,')

    await socket.on('send_name', (msg) => {
        console.log(msg)
        let data = JSON.parse(msg);
        const redisClient = new Redis(_url)
        // console.dir(redisClient);

        redisClient.set('test', msg);
        redisClient.quit();
        socket.emit('send_name', data['name']);
    })


    await socket.on('get_name', () => {
        const redisClient = new Redis(_url)
        // console.dir(redisClient);
        let ds = redisClient.get('test');
        // console.log(JSON.parse(ds))

        socket.emit('get_name', ds)

    })


    socket.on('disconnect', () => {
        console.log('connect 끊어짐....')
    })

})



