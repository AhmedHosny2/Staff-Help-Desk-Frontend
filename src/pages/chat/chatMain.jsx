import React from "react";
import ReactDOM from "react-dom/client";
import ChatpApp from "./chatApp";
import AuthContextProvider from "./context/AuthContext";
import SocketContextProvider from "./context/SocketContext";

export default function ChatMain() {
  return (
    <React.StrictMode>
        <AuthContextProvider>
          <SocketContextProvider>
            <ChatpApp />
          </SocketContextProvider>
        </AuthContextProvider>
      
    </React.StrictMode>
  );
}
