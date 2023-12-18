import { motion } from 'framer-motion';
import Hero from './components/hero/hero';
import LogsTable from './components/shortLogs/logs';
import Footer from '../../components/footer/footer';

export default function AdminHomePage() {
	return (
		<>
			{/* <div className="bringBack"> */}
			<Hero />
			<LogsTable />
			{/* </div> */}
			<Footer />
		</>
	);
}
