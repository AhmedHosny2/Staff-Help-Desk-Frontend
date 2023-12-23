import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Restrict access to pages
import PublicRoute from './utils/PublicRoute.js';

// Restrict access to pages
import PrivateRoute from './utils/PrivateRoute.js';

// Imported Components

import NavbarParent from './components/navbarParent/navbarParent.jsx';

// Imported Pages
import LandingPage from './pages/landing/landing.jsx';
import UserHomePage from './pages/home-user/home.jsx';
import AdminHomePage from './pages/home-admin/home.jsx';
import AgentHomePage from './pages/home-agent/home.jsx';
import ManagerHomePage from './pages/home-manager/home.jsx';
import TestPage from './pages/test/test.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Profile from './pages/profile/profile.jsx';
import Logs from './pages/Logs/Logs.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import AddUser from './pages/AddUser/AddUser.jsx';
import Report from './pages/report/report.jsx';
import KnowledgeBaseHomePage from './pages/knowledgeBase/knowledgeBase-home.jsx';
import ChangeBrandPage from "./pages/ChangeBrand/ChangeBrand.jsx";

function App() {
	const location = useLocation();
	const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin') === 'true');
	const [profilePic, setProfilePic] = useState(null);

	useEffect(() => {
		// Function to check if a cookie exists
		const checkCookie = (cookieName) => {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.startsWith(`${cookieName}=`)) {
					return true; // Cookie exists
				}
			}
			return false; // Cookie does not exist
		};

		// Function to get the user's role from localStorage
		const getRole = () => {
			var role = localStorage.getItem('role');
			if (role && role.startsWith('agent')) {
				return role.slice(0, -1); // Remove the trailing character from the agent role
			}
			return role;
		};
		const role = getRole();

		// Check if the "authCookie" exists
		const isAuthCookieExists = checkCookie('authcookie');

		// Define an object to represent the role hierarchy and allowed pages for each role

		// Check if the user is not logged in and is trying to access a private route
		if (
			!isAuthCookieExists &&
			privateRoutes.some((route) => location.pathname.startsWith(route))
		) {
			navigate('/');
		}

		// Check if the user is logged in and trying to access a public route or not on a private route
		if (
			isAuthCookieExists &&
			!roleHierarchy[role]?.some((route) => location.pathname.startsWith(route))
		) {
			// Construct the path based on the user's role
			const homePath = roleHierarchy[role] ? roleHierarchy[role][0] : '/profile';
			navigate(homePath);
		}
	}, [location.pathname, navigate]); // Include location.pathname and navigate in the dependency array

	return (
		<>
			<NavbarParent
				loggedin={loggedin}
				setLoggedin={setLoggedin}
				profilePic={profilePic}
				setProfilePic={setProfilePic}
			/>
			<AnimatePresence>
				<Routes location={location} key={location.key}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home/user" element={<UserHomePage />} />
					<Route path="/home/admin" element={<AdminHomePage />} />
					<Route path="/home/agent" element={<AgentHomePage />} />
					<Route path="/home/manager" element={<ManagerHomePage />} />
					<Route path="/test" element={<TestPage />} />
					<Route path="/login" element={<Login setLoggedin={setLoggedin} />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/logs" element={<Logs />} />
					<Route path="/manageUsers" element={<ManageUsers />} />
					<Route path="/AddUser" element={<AddUser />} />
					<Route path="/profile" element={<Profile setProfilePic={setProfilePic} />} />
					<Route path="/report" element={<Report />} />
					<Route path="/knowledgeBase" element={<KnowledgeBaseHomePage />} />
					<Route path="/changeBrand" element={<ChangeBrandPage />} />
				</Routes>
			</AnimatePresence>
		</>
	);



          

}

export default App;

{
	/* <>
	<NavbarParent loggedin={loggedin} setLoggedin={setLoggedin} />
	<AnimatePresence>
		<Routes location={location} key={location.key}>
			<Route
				path="/"
				element={
					<PublicRoute
						element={<LandingPage />}
						isLoggedin={loggedin}
						fallbackPath="/profile"
					/>
				}
			/>
			<Route
				path="/home/user"
				element={
					<PrivateRoute element={<HomePage />} isLoggedin={loggedin} fallbackPath="/login" />
				}
			/>
			<Route
				path="/login"
				element={
					<PublicRoute
						element={<Login setLoggedin={setLoggedin} />}
						isLoggedin={loggedin}
						fallbackPath="/profile"
					/>
				}
			/>

			<Route
				path="/signup"
				element={
					<PublicRoute element={<Signup />} isLoggedin={loggedin} fallbackPath="/profile" />
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoute element={<Profile />} isLoggedin={loggedin} fallbackPath="/login" />
				}
			/>
		</Routes>
	</AnimatePresence>
</>; */
}
