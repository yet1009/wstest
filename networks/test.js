const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Redis = require('ioredis');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Redis 어댑터 설정
const redisAdapter = require('socket.io-redis');
const redisURL = 'redis://172.31.34.1:26379'; // Redis 서버 주소와 포트를 입력해야 합니다.
io.adapter(redisAdapter({ host: 'localhost', port: 26379 }));

// Socket.io 이벤트 핸들러 설정
io.on('connection', (socket) => {
  console.log('새로운 클라이언트가 연결되었습니다.');

  // 클라이언트로부터 데이터를 받았을 때 처리
  socket.on('send_name', (data) => {
    console.log('클라이언트로부터 데이터를 받았습니다:', data);

    // 받은 데이터를 Redis에 저장
    const redisClient = new Redis(redisURL);
    redisClient.set('asf', JSON.stringify(data));
    redisClient.quit(); // Redis 클라이언트 연결 종료
  });

  // 클라이언트가 연결을 끊었을 때 처리
  socket.on('disconnect', () => {
    console.log('클라이언트와의 연결이 해제되었습니다.');
  });
});

// 서버 포트 설정
const port = 4006;
server.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
