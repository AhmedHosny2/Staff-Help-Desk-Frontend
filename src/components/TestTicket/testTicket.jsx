import TestTicketComponent from './components/testTicket';
import img from '../../assets/itsupport.jpg';

const data = {
	image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
	issue: 'Internet Connection Issue',
	category: 'servers',
	description: 'The server in our office is down, and we cant access critical files',
	firstName: 'Ahmed',
	lastName: 'Yehia',
	profilePicture: 'https://tailwindcss.com/img/erin-lindford.jpg',
};

export default function TestestTicket() {
	return (
		<>
			<div className="bringBack">
				<TestTicketComponent data={data} />
			</div>
		</>
	);
}
