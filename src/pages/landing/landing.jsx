import { motion } from 'framer-motion';

// Imported Components
import LandingParallax from './components/landingParallax/landingParallax';
import Hero from './components/hero/hero';
import LogoCloud from './components/logoCloud/logoCloud';
import LogoCloud2 from './components/logoCloud2/logoCloud2';
import Features from './components/features/features';
import Colors from './components/colors/colors';
import App from './components/app/app';
import Footer from '../../components/footer/footer';

const pageVarient = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: -70,
		transition: { delay: 1, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
	},
};

export default function LandingPage() {
	return (
		<>
			<motion.div variants={pageVarient} initial="hidden" animate="visible" exit="exit">
				<LandingParallax />
				<Hero />
				<LogoCloud />
				<LogoCloud2 />
				<Features />
				<Colors />
				<App />
				<Footer />
			</motion.div>
		</>
	);
}
