import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navigationVariants = {
	hidden: {
		y: -250,
	},
	visible: {
		y: 0,
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 120,
		},
	},
	exit: {
		y: -250,
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 70,
		},
	},
};

export default function NavbarComponent() {
	const navigate = useNavigate();

	return (
		<>
			<motion.div variants={navigationVariants} initial="hidden" animate={'visible'} exit="exit">
				<div className="navbar bg-primary text-primary-content">
					<button className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
						DAISY UI
					</button>
				</div>
			</motion.div>
		</>
	);
}
