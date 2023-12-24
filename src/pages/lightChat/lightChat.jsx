import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { customFetch } from "../../utils/Fetch.js";
export default function LightChat() {
  // TODO get chatID from DB
  const receiverId = "6585499917702460a099806f";
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
      socketInstance.emit("joinRoom", receiverId);
    });

    socketInstance.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // use custom fetch to store the message
    const body = {
      receiver: "6585499917702460a099806f",
      //TODO get receiver from DB
      message: messageInput,
    };
    console.log("lol/n/n\n\n");
    console.log(process.env.REACT_APP_LIGHTCHAT_URL);
    customFetch(process.env.REACT_APP_LIGHTCHAT_URL + "chat/send", "POST", body);
    if (socket && messageInput.trim() !== "") {
      socket.emit("message", { receiverId, message: messageInput });
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
