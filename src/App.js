import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/login/login';
// Imported Components
import NavbarComponent from './components/navbar/navbar.jsx';

// Imported Pages
import LandingPage from './pages/landing/landing.jsx';
import HomePage from './pages/home/home.jsx';
import TestPage from './pages/test/test.jsx';

function App() {
	const location = useLocation();
	return (
		<>
			<NavbarComponent />
			<AnimatePresence>
				<Routes location={location} key={location.key}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/test" element={<TestPage />} />
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;

