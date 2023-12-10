import { Link } from 'react-router-dom';

export default function LandingNavbar() {
	return (
		<>
			<div className="navbar bg-secondary">
				<div className="navbar-start">
					<Link className="btn btn-ghost text-xl">DeskMate</Link>
				</div>
				<div className="navbar-end">
					<Link className="btn mr-2" to="/login">
						Login
					</Link>
					<Link to="/login" className="btn btn-outline">
						Sign up
					</Link>
				</div>
			</div>
		</>
	);
}
