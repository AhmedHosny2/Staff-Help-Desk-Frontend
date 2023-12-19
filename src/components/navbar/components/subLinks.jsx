import { Link } from 'react-router-dom';

export default function SubLinks() {
	// user, agent1, agent2, ageng3, manager, admin
	const role = localStorage.getItem('role');

	const renderLinksBasedOnRole = () => {
		switch (role) {
			case 'user':
				return (
					<>
						<li>
							<Link>+ Ticket</Link>
						</li>
						<li>
							<Link>Knowledge Base</Link>
						</li>
						<li>
							<Link>Chat</Link>
						</li>
					</>
				);

			case 'agent1':
			case 'agent2':
			case 'agent3':
				return (
					<>
						<li>
							<Link>Agent Item 1</Link>
						</li>
						<li>
							<Link>Agent Item 2</Link>
						</li>
						<li>
							<Link>Agent Item 3</Link>
						</li>
					</>
				);

			case 'manager':
				return (
					<>
						<li>
							<Link to="/report">Generate Report</Link>
						</li>
						<li>
							<Link>Manager Item 2</Link>
						</li>
						<li>
							<Link>Manager Item 3</Link>
						</li>
					</>
				);

			case 'admin':
				return (
					<>
						<li>
							<Link>Knowledge Base</Link>
						</li>
						<li>
							<Link>Admin Item 1</Link>
						</li>
						<li>
							<Link>Admin Item 2</Link>
						</li>
					</>
				);

			default:
				return null;
		}
	};

	return <>{renderLinksBasedOnRole()}</>;
}
