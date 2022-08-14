// const { io } = require("socket.io-client");
// const express = require('express');

// app.use('/my_model', express.static('my_model'));

// import { tm } from "./my_model/tf.min.js";
// import { tmPose } from "./my_model/teachablemachine-pose.min.js";

// // 연결할 서버
// const socket = io("ws://localhost:3000");
// // const socket = io("wss://server-domain.com");

// // 연결이 되었을 시
// socket.on("connect", () => {
//   console.log(socket.id); // D1zaU4ocucstFIqkAAAB
// });

// // 연결이 끊겼을 시
// socket.on("disconnect", () => {
//   console.log(socket.id); // undefined
// });

// // receive a message from the server
// socket.on("poseOn", () => {
//   console.log("poseOn");
// });

const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

app.use('/my_model', express.static('my_model'));

httpServer.listen(3001, () => {
  console.log('listening on *:3001');
});

// http://localhost:3001 요청에 tm.html 응답
app.get('/', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/tm.html');
});

// http://localhost:3001/controll 요청에 controll.html 반환
app.get('/controll', (req, res) => {
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/controll.html');
});

// Socket.io 통신 (서버)
io.on("connection", (socket) => {
  console.log(socket.id); // ?

  socket.on('disconnect', () => {
    console.log('클라이언트 접속 해제', socket.id);
    clearInterval(socket.interval);
  });

  socket.on("poseOn", () => {
    console.log("poseOn");
    // 원래는 io.emit 이 아니라 특정 조건에 맞는 소켓(react)에만 송신을 해야하나..
    // 급해서 아는 방법(모든 소켓에 메시지 발송)으로 해버렸다..
    io.emit("poseOn");
  });

  socket.on("poseOff", () => {
    console.log("poseOff");
    io.emit("poseOff");
  });

  socket.on("pose", (className, maxProbability) => {
    console.log(className, maxProbability);
    io.emit("pose", className, maxProbability);
  });

  socket.on("poseImg", (img) => {
    console.log("poseImg");
    io.emit("poseImg", img);
  });

});