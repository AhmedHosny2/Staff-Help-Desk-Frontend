import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Restrict access to public pages
// import PublicRoute from './utils/PublicRoute.js';

// Restrict access to private pages
// import PrivateRoute from './utils/PrivateRoute.js';

// Imported Components
import NavbarParent from './components/navbarParent/navbarParent.jsx';
import TestTicket from './components/TestTicket/testTicket.jsx';

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
import MFAValidationComponent from './pages/MFA/MFAValidationComponent.jsx';
import EnableMFAComponent from './pages/MFA/EnableMFAComponent.jsx';
import ResetPasswordRequestComponent from './pages/resetPassword/ResetPasswordComponent.jsx';
import ConfirmResetPasswordComponent from './pages/resetPassword/ConfirmResetPasswordComponent.jsx';
import Ticket from './pages/Tickets/tickets.jsx';
import TicketEntity from './pages/TicketEntity/ticketEntity.jsx';
import CreatTicketComponent from './pages/Tickets/components/createTicket.jsx';
import Error from './pages/error/error.jsx';

function App() {
	const location = useLocation();
	const [profilePic, setProfilePic] = useState(null);
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

					<Route path="/testTicket" element={<TestTicket />} />
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

// function App() {
// 	const location = useLocation();
// 	const [profilePic, setProfilePic] = useState(null);

// 	console.log('HERE LOGGED IN??');
// 	console.log(localStorage.getItem('loggedin'));

// 	return (
// 		<>
// 			<NavbarParent profilePic={profilePic} setProfilePic={setProfilePic} />
// 			<AnimatePresence>
// 				<Routes location={location} key={location.key}>
// 					{/* PUBLIC ROUTES */}
// 					<Route
// 						path="/"
// 						element={<PublicRoute element={<LandingPage />} fallbackPath="/home/user" />}
// 					/>
// 					<Route path="/" element={<LandingPage />} />
// 					<Route path="/login" element={<Login />} />
// 					<Route path="/signup" element={<Signup />} />
// 					<Route path="/resetPassword" element={<ResetPasswordRequestComponent />} />
// 					<Route path="/confirmReset/:token" element={<ConfirmResetPasswordComponent />} />

// 					<Route path="/testTicket" element={<TestTicket />} />
// 					<Route path="/test" element={<TestPage />} />

// 					{/* PRIVATE ROUTES */}
// 					<Route
// 						path="/home/user"
// 						element={<PrivateRoute element={<UserHomePage />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/home/admin"
// 						element={<PrivateRoute element={<AdminHomePage />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/home/agent"
// 						element={<PrivateRoute element={<AgentHomePage />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/home/manager"
// 						element={<PrivateRoute element={<ManagerHomePage />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/logs"
// 						element={<PrivateRoute element={<Logs />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/manageUsers"
// 						element={<PrivateRoute element={<ManageUsers />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/AddUser"
// 						element={<PrivateRoute element={<AddUser />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/profile"
// 						element={<PrivateRoute element={<Profile />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/report"
// 						element={<PrivateRoute element={<Report />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/report"
// 						element={<PrivateRoute element={<Report />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/mfa/validate"
// 						element={
// 							<PrivateRoute element={<MFAValidationComponent />} fallbackPath="/login" />
// 						}
// 					/>
// 					<Route
// 						path="/mfa/enable-mfa"
// 						element={<PrivateRoute element={<EnableMFAComponent />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/ticket"
// 						element={<PrivateRoute element={<Ticket />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/ticketEntity/:id"
// 						element={<PrivateRoute element={<TicketEntity />} fallbackPath="/login" />}
// 					/>
// 					<Route
// 						path="/createTicket"
// 						element={
// 							<PrivateRoute element={<CreatTicketComponent />} fallbackPath="/login" />
// 						}
// 					/>
// 					<Route path="*" element={<Error />} />
// 				</Routes>
// 			</AnimatePresence>
// 		</>
// 	);
// }

// export default App;
