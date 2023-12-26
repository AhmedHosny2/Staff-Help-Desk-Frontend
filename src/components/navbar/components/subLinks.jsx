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
							<details>
								<summary>Tickets</summary>
								<ul className="w-44">
									<li>
										<Link to="/createTicket">+ Ticket</Link>
									</li>
									<li>
										<Link to="/ticket">My Tickets</Link>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<Link to="/knowledgeBase">Knowledge Base</Link>
						</li>
						<li>
							<Link to="/chat">Chat</Link>
						</li>
					</>
				);

			case 'agent1':
			case 'agent2':
			case 'agent3':
				return (
					<>
						<li>
							<Link to="/ticket">All Tickets</Link>
						</li>
						<li>
							<Link to="/knowledgeBase">Knowledge Base</Link>
						</li>
						<li>
							<Link to="/EditCustomWorkflow">Edit Custom Workflow</Link>
						</li>
						<li>
							<Link to="/chat">Chat</Link>
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
							<Link to="/knowledgeBase">Knowledge Base</Link>
						</li>
						<li>
							<Link to="/chat">Chat</Link>

							<Link to="/EditAutomaticWorkflow">Edit Automatic Workflow</Link>
						</li>
					</>
				);

			case 'admin':
				return (
					<>
						<li>
							<details>
								<summary>Tickets</summary>
								<ul className="w-44">
									<li>
										<Link to="/createTicket">+ Ticket</Link>
									</li>
									<li>
										<Link to="/ticket">All Tickets</Link>
									</li>
								</ul>
							</details>
						</li>
						<li>
							<Link to="/chat">Chat</Link>
						</li>
						<li>
							<Link to="/knowledgeBase">Knowledge Base</Link>
						</li>
						<li>
							<details>
								<summary>Site Management</summary>
								<ul className="w-44">
									<li>
										<Link to="/addUser">Add User</Link>
									</li>
									<li>
										<Link to="/manageUsers">Manage Users</Link>
									</li>
									<li>
										<Link to="/report">Generate Report</Link>
									</li>
									<li>
										<Link to="/changeBrand">Customize Website</Link>
									</li>
									<li>
										<Link to="/logs">Logs</Link>
									</li>
								</ul>
							</details>
						</li>
					</>
				);

			default:
				return null;
		}
	};

	return <>{renderLinksBasedOnRole()}</>;
}
