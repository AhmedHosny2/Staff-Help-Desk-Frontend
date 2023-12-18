import { motion } from 'framer-motion';
import Hero from './components/hero/hero';
import Faq from '../../components/faq/faq';
import Footer from '../../components/footer/footer';

export default function AdminHomePage() {
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
