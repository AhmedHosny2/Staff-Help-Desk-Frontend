import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Imported Components

// Imported Pages
import LandingPage from './pages/landing/landing.jsx';
import HomePage from './pages/home-user/home.jsx';
import TestPage from './pages/test/test.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Profile from './pages/profile/profile.jsx';

function App() {
	const location = useLocation();
	return (
		<>
			<AnimatePresence>
				<Routes location={location} key={location.key}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home/user" element={<HomePage />} />
					<Route path="/test" element={<TestPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
