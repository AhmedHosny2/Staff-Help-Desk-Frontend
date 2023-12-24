import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function LightChat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_LIGHTCHAT_URL;
    console.log(url);
    const socketInstance = io(url);
  
    setSocket(socketInstance);
  
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });
  

    socketInstance.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      socket.emit("chat message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <div>
        <h2>Chat Room</h2>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
