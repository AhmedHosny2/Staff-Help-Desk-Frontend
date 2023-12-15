import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../navbar/navbar';
import NavbarLanding from '../navbarLanding/navbarLanding';

export default function Navbar2({ loggedin, setLoggedin, profilePic }) {
	return (
		<AnimatePresence mode="wait">
			{loggedin ? (
				<motion.div key="loggedin">
					<Navbar setLoggedin={setLoggedin} profilePic={profilePic} />
				</motion.div>
			) : (
				<motion.div key="loggedout">
					<NavbarLanding />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
