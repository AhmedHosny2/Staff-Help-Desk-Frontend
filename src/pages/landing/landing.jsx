import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: {
		x: '100vw',
	},
	visible: {
		x: '0vw',
		transition: { delay: 0.5, duration: 0.4 },
	},
	exit: {
		x: '-100vw',
		transition: { ease: 'easeInOut' },
	},
};

export default function LandingPage() {
	return (
		<>
			<motion.div
				className="bg-secondary h-screen"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div>Welcome to the Landing page</div>
				<Link to="/home">Click here to navigate to Home page</Link>
			</motion.div>
		</>
	);
}
