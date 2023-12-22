import React from 'react';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { useNavigate } from 'react-router-dom';
import { Parser } from 'html-to-react';

export default function Section2({ data }) {
	const navigate = useNavigate();
	const [content, setContent] = useState('');
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(false);

	const editor = useRef(null);

	const formattedDate = new Date(data.timeCreated).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const handleButtonClick = async (e) => {
		setLoading(true);
		console.log(e.target.value);
		const body = {
			ticketId: window.location.pathname.split('/')[2],
			solution: editor.current.value,
			status: e.target.value,
		};
		const { newStatus } = await customFetch(
			process.env.REACT_APP_TICKETS_URL + '/solveTicket',
			'PUT',
			body
		);
		setStatus(newStatus);
		if (newStatus === 200) {
			setLoading(false);
			navigate('/ticket');
		} else {
			setLoading(false);
			alert('Error');
		}
	};

	return (
		<>
			<div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
				<div className="flex flex-wrap">
					<h2 className="text-center mb-3 text-xl font-bold">Title: {data.title}</h2>
					<div className="stats stats-vertical lg:stats-horizontal shadow mb-3">
						<div className="stat">
							<div className="stat-value">Date</div>
							<div className="stat-title">Ticket opened on</div>
							<div className="stat-desc">{formattedDate}</div>
						</div>

						<div className="stat">
							<div className="stat-value">Priority</div>
							<div className="stat-desc">{data.ticketPriority}</div>
						</div>

						<div className="stat">
							<div className="stat-value">Status</div>
							<div className="stat-desc">{data.status}</div>
						</div>
					</div>

					<div className="collapse collapse-plus bg-base-200 mb-6">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium">Description</div>
						<div className="collapse-content">
							<p>{data.description}</p>
						</div>
					</div>

					{data.userType === 'agent' && (
						<div className="collapse collapse-plus bg-base-200">
							<input type="checkbox" />
							<div className="collapse-title text-xl font-medium">Solution</div>
							<div className="collapse-content">
								<JoditEditor ref={editor} value={content} />

								<div className="flex mt-3">
									{!loading ? (
										<>
											<button
												className="btn btn-outline btn-success m-auto"
												value="closed"
												onClick={handleButtonClick}
											>
												Save & Close Ticket
											</button>
											<button
												className="btn btn-outline btn-primary m-auto"
												value="updated"
												onClick={handleButtonClick}
											>
												Update
											</button>
										</>
									) : (
										<>
											<button className="btn btn-outline btn-success m-auto" disabled>
												Saving Changes
												<span className="loading loading-spinner loading-sm ml-4"></span>
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					)}

					{data.userType === 'user' && (
						<>
							<div className="collapse collapse-plus bg-base-200 mb-6">
								<input type="checkbox" />
								<div className="collapse-title text-xl font-medium">Solutions</div>
								<div className="collapse-content">
									{data.ticketSolution.length > 0 ? (
										// add spcae here
										<div>
											{data.ticketSolution.map((sol, index) => (
												<div key={index} dangerouslySetInnerHTML={{ __html: sol }} />
											))}
										</div>
									) : (
										<p>
											Our agents are working on it
											<span className="loading loading-dots loading-md ml-6"></span>
										</p>
									)}
								</div>
							</div>

							{/* AHMED YEHIAS CODE. DIDNT WANA DELETE IT YET */}
							{/* <div className="badge badge-primary badge-outline text-xl item-center mx-auto">
								Solution
							</div>

							{data.ticketSolution.length > 0 ? (
								// add spcae here
								<div>
									<>
										<br />
									</>

									{data.ticketSolution.map((sol, index) => (
										<div key={index} dangerouslySetInnerHTML={{ __html: sol }} />
									))}
								</div>
							) : (
								<p>Our agents are working on it</p>
							)} */}
						</>
					)}
				</div>
			</div>
		</>
	);
}

{
	/* //   <div className="flex justify-between mt-8">
              //   <button
              //     className="flex items-center btn btn-success"
              //     value="closed"
              //     onClick={handleButtonClick}
              //   >
              //     <img src={saveButton} alt="Save & Close Ticket" className="mr-2" />
              //     Save & Close Ticket
              //   </button>
              //   <button
              //     className="flex items-center btn btn-info"
              //     value="updated"
              //     onClick={handleButtonClick}
              //   >
              //     <img src={updateButton} alt="Update" className="mr-2" />
              //     Update
              //   </button>
              // </div>/ */
}
