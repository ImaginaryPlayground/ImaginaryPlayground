const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive, i am node.js server 4001 port" }).status(200);
});



module.exports = router


//const express = require('express'); const app = express(); const http = require('http'); const server = http.createServer(app); const { Server } = require("socket.io"); const io = new Server(server); // localhost:3000으로 방문 시 index.html로 라우팅 app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); }); // socket이 connection 상태일때 io.on('connection', (socket) => { socket.on('chat message', (msg) => { io.emit('chat message', msg); console.log('message: ' + msg); }); socket.on('disconnect', () => { console.log('user disconnected'); }); }); // server는 localhost:3000 server.listen(3000, () => { console.log('listening on *:3000'); });