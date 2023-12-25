import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Imported Components
import NavbarParent from './components/navbarParent/navbarParent.jsx';

// Imported Pages
// import LandingPage from './pages/landing/landing.jsx';
// import UserHomePage from './pages/home-user/home.jsx';
// import AdminHomePage from './pages/home-admin/home.jsx';
// import AgentHomePage from './pages/home-agent/home.jsx';
// import ManagerHomePage from './pages/home-manager/home.jsx';
// import TestPage from './pages/test/test.jsx';
// import Login from './pages/login/login.jsx';
// import Signup from './pages/signup/signup.jsx';
// import Profile from './pages/profile/profile.jsx';
// import Logs from './pages/Logs/Logs.jsx';
// import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
// import AddUser from './pages/AddUser/AddUser.jsx';
// import Report from './pages/report/report.jsx';
// import KnowledgeBaseHomePage from './pages/knowledgeBase/knowledgeBase-home.jsx';
// import ChangeBrandPage from './pages/ChangeBrand/ChangeBrand.jsx';
// import MFAValidationComponent from './pages/MFA/MFAValidationComponent.jsx';
// import EnableMFAComponent from './pages/MFA/EnableMFAComponent.jsx';
// import ResetPasswordRequestComponent from './pages/resetPassword/ResetPasswordComponent.jsx';
// import ConfirmResetPasswordComponent from './pages/resetPassword/ConfirmResetPasswordComponent.jsx';
// import Ticket from './pages/Tickets/tickets.jsx';
// import CreatTicketComponent from './pages/Tickets/components/createTicket.jsx';
// import Error from './pages/error/error.jsx';
// import TicketEntity from './pages/TicketEntity/entityTicket.jsx';

// const privateRoutes = [
// 	`/home/user`,
// 	`/home/admin`,
// 	`/home/agent`,
// 	`/home/manager`,
// 	`/logs`,
// 	`/manageUsers`,
// 	`/AddUser`,
// 	`/profile`,
// 	`/report`,
// 	`/mfa/validate`,
// 	`/mfa/enable-mfa`,
// 	`/ticket`,
// 	`/ticketEntity`,
// 	`/createTicket`,
// 	`/knowledgeBase`,
// 	`/profileGeneral`,
// 	'*',
// ];

// const roleHierarchy = {
// 	user: [
// 		'/home/user',
// 		'/profile',
// 		`/profileGeneral`,
// 		'/mfa/validate',
// 		'/mfa/enable-mfa',
// 		'/ticket',
// 		'/ticketEntity/:id',
// 		'/createTicket',
// 		'/knowledgeBase',
// 	],
// 	agent: [
// 		'/home/agent',
// 		'/profile',
// 		`/profileGeneral`,
// 		'/mfa/validate',
// 		'/mfa/enable-mfa',
// 		'/ticket',
// 		'/ticketEntity/:id',
// 		'/knowledgeBase',
// 	],
// 	manager: [
// 		'/home/manager',
// 		'/logs',
// 		'/manageUsers',
// 		'/profile',
// 		`/profileGeneral`,
// 		'/report',
// 		'/mfa/validate',
// 		'/mfa/enable-mfa',
// 		'/ticket',
// 		'/ticketEntity/:id',
// 		'/knowledgeBase',
// 	],
// 	admin: [
// 		'/home/admin',
// 		'/logs',
// 		'/manageUsers',
// 		'/AddUser',
// 		'/profile',
// 		`/profileGeneral`,
// 		'/report',
// 		'/mfa/validate',
// 		'/mfa/enable-mfa',
// 		'/ticket',
// 		'/ticketEntity/:id',
// 		'/createTicket',
// 		'/knowledgeBase',
// 	],
// };


function App() {
	const location = useLocation();
	const [loggedin, setLoggedin] = useState(localStorage.getItem('loggedin') === 'true');
	const [profilePic, setProfilePic] = useState(null);
	return (
		<>
			<NavbarParent
				loggedin={loggedin}
				setLoggedin={setLoggedin}
				profilePic={profilePic}
				setProfilePic={setProfilePic}
			/>
			{/* <AnimatePresence>
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
					<Route path="*" element={<Error />} />
				</Routes>
			</AnimatePresence> */}
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
