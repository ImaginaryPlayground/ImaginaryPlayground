const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
// const index = require("./routes/index");

const app = express();
// app.use(index);

// react build 파일을 사용하는 경우
// app.use(express.static(__dirname + '/build'));

// app.get('/', function (req, res) {
//   // console.log(__dirname + '/build/index.html');
//   res.sendFile(__dirname + '/build/index.html');
// });

const server = http.createServer(app);

//cors 에러 방지 코드
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("hoNew client connected");
  if (interval) {
    clearInterval(interval);
  }
  // 추가
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    //socket.emit("DistanceAPI", response);
    console.log("distance: " + msg);
  });
  // 여기까지
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

const getApidistanceEmit = (socket) => {
  const response = 123;
  // Emitting a new message. Will be consumed by the client
  socket.emit("DistanceAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
