const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
// const config = require('config');

const { Server } = require('socket.io');
const io = new Server(server);


io.listen(4005);

io.on('connection', async (socket) => {
    console.log('socket connection, ',socket.id)
})



