import { motion } from 'framer-motion';
import Hero from './components/hero/hero';
import StatsCard from './components/hero/stats';
import Footer from '../../components/footer/footer';

export default function ManagerHomePage() {
	return (
		<>
			{/* <div className="bringBack"> */}
			<Hero />
			<StatsCard />
			{/* </div> */}
			<Footer />
		</>
	);
}
