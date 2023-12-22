import React from 'react';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { useNavigate } from 'react-router-dom';
import { Parser } from 'html-to-react';

export default function Section2({ data }) {
	console.log(data);
	const navigate = useNavigate();
	console.log(data.userType);
	const [content, setContent] = useState('');
	const [status, setStatus] = useState(null);

	const editor = useRef(null);
	const handleButtonClick = async (e) => {
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
		if (newStatus === 200) navigate('/ticket');
		else alert('Error');
	};
	return (
		<>
			<div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
				<div className="flex flex-wrap">
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

								<div className="flex">
									<button
										className=" btn  btn-outline  btn-success m-auto"
										value="closed"
										onClick={handleButtonClick}
									>
										Save & Close Ticket
									</button>
									<button
										className=" btn  btn-outline  btn-primary m-auto"
										value="updated"
										onClick={handleButtonClick}
									>
										Update
									</button>
								</div>
							</div>
						</div>
					)}

					{data.userType === 'user' && (
						<>
							<div className="badge badge-primary badge-outline text-xl item-center mx-auto">
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
							)}
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
