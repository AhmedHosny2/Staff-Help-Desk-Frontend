import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

export default function UserTicket({ data }) {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState('');
	const [activeTab, setActiveTab] = useState('All');
	const [isLoading, setIsLoading] = useState(true);
	const [filteredData, setFilteredData] = useState([]);

	const handleButtonClick = (ticketId) => {
		navigate(`/ticketEntity/${ticketId}`);
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	useEffect(() => {
		if (data) {
			// Assuming data is an array, update the filtered data when data changes
			const dataArray = Array.isArray(data) ? data : [];
			const updatedFilteredData = dataArray.filter(
				(ticketData) =>
					(ticketData.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
						ticketData.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
						ticketData.sub_category?.toLowerCase().includes(searchQuery.toLowerCase())) &&
					(activeTab === 'All' || ticketData.issue_type === activeTab)
			);
			setFilteredData(updatedFilteredData);
			setIsLoading(false);
		}
	}, [data, searchQuery, activeTab]);

	return (
		<>
			<div className="flex flex-col items-center justify-center my-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
				<input
					type="text"
					placeholder="Search by keyword"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="input input-bordered input-primary w-full max-w-xs"
				/>
				<div role="tablist" className="tabs tabs-boxed md:flex md:space-x-4">
					<Link
						to="#"
						role="tab"
						className={`tab ${activeTab === 'All' ? 'tab-active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							handleTabClick('All');
						}}
					>
						All
					</Link>
					<Link
						to="#"
						role="tab"
						className={`tab ${activeTab === 'Software' ? 'tab-active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							handleTabClick('Software');
						}}
					>
						Software
					</Link>
					<Link
						to="#"
						role="tab"
						className={`tab ${activeTab === 'Hardware' ? 'tab-active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							handleTabClick('Hardware');
						}}
					>
						Hardware
					</Link>
					<Link
						to="#"
						role="tab"
						className={`tab ${activeTab === 'Network' ? 'tab-active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							handleTabClick('Network');
						}}
					>
						Network
					</Link>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>TICKET ID</th>
							<th>Title</th>
							<th>Issue Type</th>
							<th>Category</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{data ? (
							<>
								{filteredData.map((ticketData) => (
									<tr
										key={ticketData._id}
										className="hover"
										onClick={() => handleButtonClick(ticketData._id)}
									>
										<th className="w-3/12">{ticketData._id}</th>
										<td>
											{ticketData.title && ticketData.title.length > 15
												? ticketData.title.substring(0, 15) + '...'
												: ticketData.title}
										</td>
										<td>{ticketData.issue_type}</td>
										<td>
											{ticketData.sub_category && ticketData.sub_category.length > 15
												? ticketData.sub_category.substring(0, 15) + '...'
												: ticketData.sub_category}
										</td>
										<td>
											{ticketData.status === 'pending' ? (
												<>
													{ticketData.status}{' '}
													<span className="loading loading-ring loading-xs"></span>
												</>
											) : (
												ticketData.status
											)}
										</td>
									</tr>
								))}
							</>
						) : (
							<>
								{[1, 2, 3, 4].map((index) => (
									<React.Fragment key={index}>
										<tr>
											<td>
												<div className="skeleton h-4 w-8/12"></div>
											</td>
											<td>
												<div className="skeleton h-4 w-8/12"></div>
											</td>
											<td>
												<div className="skeleton h-4 w-3/12"></div>
											</td>
											<td>
												<div className="skeleton h-4 w-7/12"></div>
											</td>
											<td>
												<div className="skeleton h-4 w-3/12"></div>
											</td>
										</tr>
									</React.Fragment>
								))}
							</>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}

{
	/* {filteredData.map((ticketData) => (
				<div
					key={ticketData._id}
					className="card w-96 bg-base-100 shadow-xl mb-4"
					onClick={() => handleButtonClick(ticketData._id)}
				>
					<figure>
						<QRCode value={window.location.href} />
					</figure>
					<div className="card-body">
						<h2 className="card-title">
							{ticketData.title}
							<div className="badge badge-secondary">{ticketData.status}</div>
						</h2>
						<p>{ticketData.description}</p>
						<div className="card-actions justify-end">
							<div className="badge badge-outline">{ticketData.issue_type}</div>
						</div>
					</div>
				</div>
			))} */
}
