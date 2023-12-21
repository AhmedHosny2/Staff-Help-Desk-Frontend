import Hero from './components/hero/hero';
import Footer from '../../components/footer/footer';
import TicketComponent from './components/tickets/TicketsTable';

export default function AgentHomePage() {
	return (
		<>
			{/* <div className="bringBack"> */}
			<Hero />
			{/* </div> */}
			<TicketComponent />
			<Footer />
		</>
	);
}
