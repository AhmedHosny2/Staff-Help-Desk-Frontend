import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const navigationVariants = {
	hidden: {
		y: '-20vh',
	},
	visible: {
		y: '0vh',
		transition: {
			delay: 0,
			type: 'spring',
			stiffness: 200,
		},
	},
	exit: {
		y: '-20vh',
		transition: {
			delay: 0,
			type: 'spring',
			stiffness: 200,
		},
	},
};

export default function LandingNavbar() {
	return (
		<>
			<motion.div variants={navigationVariants} initial="hidden" animate="visible" exit="exit">
				<div className="navbar bg-secondary">
					<div className="navbar-start">
						<Link to="/" className="btn btn-ghost text-xl">
							DeskMate
						</Link>
					</div>
					<div className="navbar-end">
						<Link to="/login" className="btn mr-2">
							Login
						</Link>
						<Link to="/signup" className="btn btn-outline">
							Sign up
						</Link>
					</div>
				</div>
			</motion.div>
		</>
	);
}
