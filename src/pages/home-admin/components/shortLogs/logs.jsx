import React, { useState, useEffect } from 'react';
import { customFetch } from '../../../../utils/Fetch';
import { formatDate } from '../../../../utils/FormatDate';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TableLogs = () => {
	const heroVariant = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { delay: 3, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
		},
	};

	const [rowsData, setRowsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const columns = [
		{ id: 'statuscode', label: 'Status Code' },
		{ id: 'method', label: 'Method' },
		{ id: 'api', label: 'API' },
		{ id: 'time', label: 'Time' },
	];

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const { newData, err } = await customFetch(
				`${process.env.REACT_APP_LOGGING_URL}?limit=10`,
				'GET'
			);
			if (!err) {
				setRowsData(newData);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<>
			<motion.div variants={heroVariant} initial="hidden" animate="visible">
				{isLoading ? (
					<>
						<div className="flex justify-center items-center min-h-screen">
							<h2 className="text-center text-lg sm:text-sm md:text-md lg:text-xl xl:text-2xl font-bold">
								Loading
							</h2>
							<span className="loading loading-spinner loading-md ml-4"></span>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col">
							<div className="flex flex-col items-center my-8">
								<div className="indicator">
									<span className="indicator-item badge badge-secondary">LOGS</span>
									<h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
										Recent Logs
									</h2>
								</div>
								<Link to="/logs" className="link link-hover text-sm">
									View Full Logs Details?
								</Link>
							</div>
							{/* TABLE */}
							<div className="overflow-x-auto mt-10 mb-20 mx-4 xl:mx-10 rounded-xl">
								<table className="table">
									<thead>
										<tr className="bg-secondary">
											{columns.map((column) => (
												<th key={column.id} className={`px-6 py-4`}>
													{column.label}
												</th>
											))}
										</tr>
									</thead>
									<tbody>
										<>
											{rowsData.map((row) => (
												<tr key={row.id} className="hover:bg-base-300">
													{Object.entries(row).map(([key, value]) => (
														<td key={key} className="px-6 py-4">
															{key === 'time'
																? formatDate(value, 1)
																: key === 'date'
																? formatDate(value)
																: value}
														</td>
													))}
												</tr>
											))}
										</>
									</tbody>
									{/* foot */}
									<tfoot>
										<tr className="bg-secondary">
											{columns.map((column) => (
												<th key={column.id} className={`px-6 py-4`}>
													{column.label}
												</th>
											))}
										</tr>
									</tfoot>
								</table>
							</div>
							{/* TABLE */}
						</div>
					</>
				)}
			</motion.div>
		</>
	);
};

export default TableLogs;
