export default function SubLinks() {
	// user, agent1, agent2, ageng3, manager, admin
	const role = 'user';

	const renderLinksBasedOnRole = () => {
		switch (role) {
			case 'user':
				return (
					<>
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#">User Item 2</a>
						</li>
						<li>
							<a href="#">Knowledge Base</a>
						</li>
					</>
				);

			case 'agent1':
			case 'agent2':
			case 'agent3':
				return (
					<>
						<ul className="menu menu-horizontal px-1">
							<li>
								<a href="#">Agent Item 1</a>
							</li>
							<li>
								<a href="#">Agent Item 2</a>
							</li>
							<li>
								<a href="#">Agent Item 3</a>
							</li>
						</ul>
					</>
				);

			case 'manager':
				return (
					<>
						<ul className="menu menu-horizontal px-1">
							<li>
								<a href="#">Manager Item 1</a>
							</li>
							<li>
								<a href="#">Manager Item 2</a>
							</li>
							<li>
								<a href="#">Manager Item 3</a>
							</li>
						</ul>
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
							<Link to="/knowledgeBase">Knowledge Base</Link>
						</li>
						<li>
							<Link to="/report">Generate Report</Link>
						</li>
						<li>
							<Link>Chat</Link>
						</li>

					</>
				);

			default:
				return null;
		}
	};

	return <>{renderLinksBasedOnRole()}</>;
}
