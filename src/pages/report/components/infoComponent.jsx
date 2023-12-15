export default function Info({ data }) {
	const agents = data.agents.data;

	const rating = data.averageRating;
	const tickets = data.numberOfTickets;
	const issue = data.mostFrequentIssueType;
	const openTickets = data.agentWithMostOpenedTickets;
	const closedTickets = data.agentWithMostSolvedTickets;

	return (
		<>
			<h2 className="text-center text-xl font-bold mt-16">Current Agent Information</h2>
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Role</th>
							<th>
								<div
									className="tooltip tooltip-left"
									data-tip="Most Frequent Ticket Priority"
								>
									Priority
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{agents.map((agent) => (
							<tr key={agent._id} className="hover">
								<th>{agent._id}</th>
								<td>{`${agent.firstName} ${agent.lastName}`}</td>
								<td>{agent.role}</td>
								<td>{agent.priorityMode}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="ml:8 xl:ml-16">
				<h2 className="text-md font-bold mt-16">
					Number of Tickets: <span className="text-md font-normal mt-16">{tickets}</span>
				</h2>
				<h2 className="text-md font-bold mt-2">
					Average Rating: <span className="text-md font-normal mt-16">{rating} stars</span>
					<div
						className="radial-progress ml-10"
						style={{ '--value': rating * 20 }}
						role="progressbar"
					>
						{rating}
					</div>
				</h2>
				<h2 className="text-md font-bold mt-2">
					Most Frequent Issue Type:{' '}
					<span className="text-md font-normal mt-16">{issue} issues</span>
				</h2>
				<h2 className="text-md font-bold mt-6">
					Agent With Most Open Tickets:
					<ul className="text-md font-normal ml-10">
						<li>Agent ID: {openTickets.agentId}</li>
						<li>Agent Name: {openTickets.agentName}</li>
						<li>Agent Role: {openTickets.role}</li>
						<li>Number of Open Tickets: {openTickets.openedTickets}</li>
					</ul>
				</h2>
				<h2 className="text-md font-bold mt-6">
					Agent With Most Solved Tickets:
					<ul className="text-md font-normal ml-10">
						<li>Agent ID: {closedTickets.agentId}</li>
						<li>Agent Name: {closedTickets.agentName}</li>
						<li>Agent Role: {closedTickets.role}</li>
						<li>Number of Solved Tickets: {closedTickets.solvedTickets}</li>
					</ul>
				</h2>
			</div>
		</>
	);
}
