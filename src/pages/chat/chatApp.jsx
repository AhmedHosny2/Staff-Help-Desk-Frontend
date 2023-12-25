import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './utils/style';
import Navbar from './components/Navbar';
import Home from './Chat/Home';
import Login from './Login/Login';
// import SignUp from "./pages/SignUp/SignUp";
import Room from './Room/Room';
// import "./App.css";
import ChatContextProvider from './context/ChatContext';
import { useSocketContext } from './context/SocketContext';
import { useAuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { socketEmitEvent } from './socket/emit';
import { useLocalStorage } from './hooks/useLocalStorage';

function ChatpApp() {
	const { user } = useAuthContext();
	const [mode, setMode] = useLocalStorage('chat-app-mode', 'light');

	const {
		socketConnect,
		socketValue: { socket, socketId },
	} = useSocketContext();

	useEffect(() => {
		if (user && !socketId) {
			socketConnect();
		}
	}, [user, socketId, socketConnect]);

	useEffect(() => {
		if (user && socketId) {
			socketEmitEvent(socket).userOnline(user._id, socketId);
		}
	}, [socketId, socket, user]);

	return (
		<ThemeProvider theme={{ mode, setMode }}>
			<ChatContextProvider>
				<Navbar />
				<Home />
				{/* <Login/> */}
				<GlobalStyle />
				<ToastContainer />
			</ChatContextProvider>
		</ThemeProvider>
	);
}

export default ChatpApp;
