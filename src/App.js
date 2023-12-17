import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Restrict access to pages
import PublicRoute from './utils/PublicRoute.js';

// Restrict access to pages
import PrivateRoute from './utils/PrivateRoute.js';

// Imported Components
import NavbarParent from './components/navbarParent/navbarParent.jsx';

// Imported Pages
import LandingPage from './pages/landing/landing.jsx';
import HomePage from './pages/home-user/home.jsx';
import TestPage from './pages/test/test.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Profile from './pages/profile/profile.jsx';
import Logs from './pages/Logs/Logs.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import AddUser from './pages/AddUser/AddUser.jsx';
import Report from './pages/report/report.jsx';
import Ticket from "./pages/Tickets/tickets.jsx"
import TicketEntity  from './pages/TicketEntity/ticketEntity.jsx';
import CreatTicketComponent from "./pages/Tickets/components/createTicket.jsx" 
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
			<AnimatePresence>
				<Routes location={location} key={location.key}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home/user" element={<HomePage />} />
					<Route path="/test" element={<TestPage />} />
					<Route path="/login" element={<Login setLoggedin={setLoggedin} />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/logs" element={<Logs />} />
					<Route path="/manageUsers" element={<ManageUsers />} />
					<Route path="/AddUser" element={<AddUser />} />
					<Route path="/profile" element={<Profile setProfilePic={setProfilePic} />} />
					<Route path="/report" element={<Report />} />
					<Route path="/ticket" element={<Ticket setLoggedin={setLoggedin}/>}/>
					<Route path="/ticketEntity/:id" element={<TicketEntity />}/>
					<Route path="/createTicket" element={<CreatTicketComponent />}/>
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
