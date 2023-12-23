import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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
import ProfileGeneral from './pages/profileGeneral/profile.jsx';
import Logs from './pages/Logs/Logs.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import AddUser from './pages/AddUser/AddUser.jsx';
import Report from './pages/report/report.jsx';
import KnowledgeBaseHomePage from './pages/knowledgeBase/knowledgeBase-home.jsx';
import MFAValidationComponent from './pages/MFA/MFAValidationComponent.jsx';
import EnableMFAComponent from './pages/MFA/EnableMFAComponent.jsx';
import ResetPasswordRequestComponent from './pages/resetPassword/ResetPasswordComponent.jsx';
import ConfirmResetPasswordComponent from './pages/resetPassword/ConfirmResetPasswordComponent.jsx';
import Ticket from './pages/Tickets/tickets.jsx';
import CreatTicketComponent from './pages/Tickets/components/createTicket.jsx';
import Error from './pages/error/error.jsx';
import TicketEntity from './pages/TicketEntity/entityTicket.jsx';

const privateRoutes = [
	`/home/user`,
	`/home/admin`,
	`/home/agent`,
	`/home/manager`,
	`/logs`,
	`/manageUsers`,
	`/AddUser`,
	`/profile`,
	`/report`,
	`/mfa/validate`,
	`/mfa/enable-mfa`,
	`/ticket`,
	`/ticketEntity`,
	`/createTicket`,
	`/knowledgeBase`,
	`/profileGeneral`,
	'*',
];

const roleHierarchy = {
	user: [
		'/home/user',
		'/profile',
		`/profileGeneral`,
		'/mfa/validate',
		'/mfa/enable-mfa',
		'/ticket',
		'/ticketEntity/:id',
		'/createTicket',
		'/knowledgeBase',
	],
	agent: [
		'/home/agent',
		'/profile',
		`/profileGeneral`,
		'/mfa/validate',
		'/mfa/enable-mfa',
		'/ticket',
		'/ticketEntity/:id',
		'/knowledgeBase',
	],
	manager: [
		'/home/manager',
		'/logs',
		'/manageUsers',
		'/profile',
		`/profileGeneral`,
		'/report',
		'/mfa/validate',
		'/mfa/enable-mfa',
		'/ticket',
		'/ticketEntity/:id',
		'/knowledgeBase',
	],
	admin: [
		'/home/admin',
		'/logs',
		'/manageUsers',
		'/AddUser',
		'/profile',
		`/profileGeneral`,
		'/report',
		'/mfa/validate',
		'/mfa/enable-mfa',
		'/ticket',
		'/ticketEntity/:id',
		'/createTicket',
		'/knowledgeBase',
	],
};

function App() {
	const location = useLocation();
	const navigate = useNavigate();
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
			return false; // Cookie doesn't exist
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
			<NavbarParent profilePic={profilePic} setProfilePic={setProfilePic} />
			<AnimatePresence>
				<Routes location={location} key={location.key}>
					{/* PUBLIC ROUTES */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/resetPassword" element={<ResetPasswordRequestComponent />} />
					<Route path="/confirmReset/:token" element={<ConfirmResetPasswordComponent />} />

					<Route path="/test" element={<TestPage />} />

					{/* PRIVATE ROUTES */}
					<Route path="/home/user" element={<UserHomePage />} />
					<Route path="/home/admin" element={<AdminHomePage />} />
					<Route path="/home/agent" element={<AgentHomePage />} />
					<Route path="/home/manager" element={<ManagerHomePage />} />
					<Route path="/logs" element={<Logs />} />
					<Route path="/manageUsers" element={<ManageUsers />} />
					<Route path="/AddUser" element={<AddUser />} />
					<Route path="/profile" element={<Profile setProfilePic={setProfilePic} />} />
					<Route path="/profile/:id" element={<ProfileGeneral />} />
					<Route path="/report" element={<Report />} />

					<Route path="/mfa/validate" element={<MFAValidationComponent />} />
					<Route path="/mfa/enable-mfa" element={<EnableMFAComponent />} />
					<Route path="/ticket" element={<Ticket />} />
					<Route path="/ticketEntity/:id" element={<TicketEntity />} />
					<Route path="/createTicket" element={<CreatTicketComponent />} />
					<Route path="/knowledgeBase" element={<KnowledgeBaseHomePage />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
