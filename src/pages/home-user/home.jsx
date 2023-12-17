import { motion } from 'framer-motion';
import Hero from './components/hero/hero';
import Faq from '../../components/faq/faq';
import Footer from '../../components/footer/footer';

// Imported Components

// const containerVariants = {
// 	hidden: {
// 		x: '100vw',
// 	},
// 	visible: {
// 		x: '0vw',
// 		transition: { delay: 0.5, duration: 0.4 },
// 	},
// 	exit: {
// 		x: '-100vw',
// 		transition: { ease: 'easeInOut' },
// 	},
// };

export default function UserHomePage() {
	return (
		<>
			{/* <div className="bringBack"> */}
			<Hero />
			{/* </div> */}
			<Faq />
			<Footer />
		</>
	);
}
