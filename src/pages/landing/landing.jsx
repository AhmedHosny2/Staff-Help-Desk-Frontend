import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Imported Components
import LandingParallax from './components/landingParallax/landingParallax';
import Hero from './components/hero/hero';
import LogoCloud from './components/logoCloud/logoCloud';
import LogoCloud2 from './components/logoCloud2/logoCloud2';
import App from './components/app/app';
import Features from './components/features/features';
import Footer from '../../components/footer/footer';

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
				className="bg-primary"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<LandingParallax />
				<Hero />
				<LogoCloud />
				<LogoCloud2 />
				<Features />
				<App />
				<Footer />
			</motion.div>
		</>
	);
}
