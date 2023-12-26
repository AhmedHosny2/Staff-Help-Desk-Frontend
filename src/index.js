import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./pages/chat/context/AuthContext";
import SocketContextProvider from "./pages/chat/context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
	  navigator.serviceWorker.register('/service-worker.js')
		.then(registration => {
		  console.log('ServiceWorker registration successful:', registration);
		})
		.catch(error => {
		  console.log('ServiceWorker registration failed:', error);
		});
	});
  }
  
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
//useless comment