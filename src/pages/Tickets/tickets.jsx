import TicketComponent from './components/tickets';

export default function Ticket({ setLoggedin }) {
	return (
		<>
			<TicketComponent setLoggedin={setLoggedin} />
		</>
	);
}
