import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  console.log(response);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("chat message", (data) => {
      setResponse(data);
      console.log(data);
    });
    socket.on("FromAPI", (data) => {
      setResponse(data);
      console.log(data);
    });
  }, []);

  return (
    <p>
      여기는 react 클라이언트! <br />
      port 3000 번호 <br />
      현재 시간 알려줘! <br />
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
