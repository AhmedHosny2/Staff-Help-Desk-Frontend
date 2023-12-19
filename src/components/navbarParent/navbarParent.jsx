import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../navbar/navbar';
import NavbarLanding from '../navbarLanding/navbarLanding';

export default function Navbar2({ profilePic, setProfilePic }) {
	const loggedin = localStorage.getItem('loggedin');
	return (
		<AnimatePresence mode="wait">
			{loggedin ? (
				<motion.div key="loggedin">
					<Navbar profilePic={profilePic} setProfilePic={setProfilePic} />
				</motion.div>
			) : (
				<motion.div key="loggedout">
					<NavbarLanding />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
