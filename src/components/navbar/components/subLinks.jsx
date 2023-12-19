export default function SubLinks() {
	// user, agent1, agent2, ageng3, manager, admin
	const role = localStorage.getItem('role');

	const renderLinksBasedOnRole = () => {
		switch (role) {
			case 'user':
				return (
					<>
						<li>
							<a href="#">User Item 1</a>
						</li>
						<li>
							<a href="#">User Item 2</a>
						</li>
						<li>
							<a href="#">User Item 3</a>
						</li>
					</>
				);

			case 'agent1':
			case 'agent2':
			case 'agent3':
				return (
					<>
						<li>
							<a href="#">Agent Item 1</a>
						</li>
						<li>
							<a href="#">Agent Item 2</a>
						</li>
						<li>
							<a href="#">Agent Item 3</a>
						</li>
					</>
				);

			case 'manager':
				return (
					<>
						<li>
							<a href="#">Manager Item 1</a>
						</li>
						<li>
							<a href="#">Manager Item 2</a>
						</li>
						<li>
							<a href="#">Manager Item 3</a>
						</li>
					</>
				);

			case 'admin':
				return (
					<>
						<li>
							<a href="#">Admin Item 1</a>
						</li>
						<li>
							<a href="#">Admin Item 2</a>
						</li>
						<li>
							<a href="#">Admin Item 3</a>
						</li>
					</>
				);

			default:
				return null;
		}
	};

	return <>{renderLinksBasedOnRole()}</>;
}
