import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import SaveIcon from '@mui/icons-material/Save';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import { io } from "socket.io-client";
export default function CreatTicketComponent({socket}) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		issue_type: null,
		sub_category: null,
	});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [automaticWorkflow, setAutomaticWorkflow] = useState([]);

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [statusText, setStatusText] = useState('');
	const [message, setMessage] = useState('');
//notf 

const handleNotification = (type) => {
	if(!socket)socket=io("http://localhost:5011");
	socket.emit("sendNotification", {
	  senderName: "We",
	  receiverName:"" ,
	  type,
	});
  };


	const handleButtonClick = (e) => {
		handleNotification("Created New");
		setIsPending(true);
		const body = {
			title: title,
			description: description,
			issue_type: formData.issue_type,
			sub_category: formData.sub_category,
		};
		const fetchData = async () => {
			const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
				process.env.REACT_APP_TICKETS_URL + '/createTicket',
				'POST',
				body
			);
			if (newStatusText === 'success') {
				// Step 1: Save toast id using var
				var toastId = toast.success('Your Ticket Was Created!', getToastStyle());
				setTimeout(() => {
					navigate('/ticket');
					setIsPending(false);
				}, 2500);
			} else {
				// Step 2: This is the other toast (for error)
				setIsPending(false);
				toastId = toast.error(newMessage, getToastStyle());
			}
			// Step 3: always call this function
			removeToast(toast, toastId);
		};
		fetchData();
	};

	const handleIssueTypeChange = (selectedIssueType) => {
		// Handle the change of issue type
		setFormData({
			...formData,
			issue_type: selectedIssueType,
			sub_category: null, // Reset sub_category when issue_type changes
		});
	};

	const handleSubCategoryChange = (selectedSubCategory) => {
		// Handle the change of sub_category
		setFormData({
			...formData,
			sub_category: selectedSubCategory,
		});
		setAutomaticWorkflow([]);
		getAutomaticWorkflow(formData.issue_type, selectedSubCategory);
	};

	const getAutomaticWorkflow = async (issue_type, sub_category) => {
		const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
			process.env.REACT_APP_TICKETS_URL +
			`/getAutomaticWorkflow?issue_type=${issue_type}&sub_category=${sub_category}`,
			'GET'
		);
		console.log(newData.fixes)
		setAutomaticWorkflow(newData.fixes);
	};

	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Have a problem?</h1>
						<p className="py-6">Create your Ticket for free.</p>
					</div>
					<div className="card shrink-0 w-full max-w-3xl shadow-2xl">
						<div className="card-body">
							<div className="flex lg:flex-row flex-col">
								<div className="flex-1 lg:mr-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text" required>
												Title
											</span>
										</label>
										<input
											type="text"
											placeholder="Internet Connection Issue"
											className="input input-bordered"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<select
								className="select select-bordered w-full max-w-xs  mt-4"
								value={formData.issue_type || ''}
								onChange={(e) => handleIssueTypeChange(e.target.value)}
							>
								<option value="">Select issue type</option>
								<option value="Software">Software</option>
								<option value="Hardware">Hardware</option>
								<option value="Network">Network</option>
								<option value="Other">Other</option>
							</select>

							{formData.issue_type && (
								<div className="mt-4">
									<select
										className="select select-bordered w-full max-w-xs "
										value={formData.sub_category || ''}
										onChange={(e) => handleSubCategoryChange(e.target.value)}
									>
										<option value="">Select a category</option>

										{formData.issue_type === "Hardware" && (
											<>
												<option value="desktops">Desktops</option>
												<option value="laptops">Laptops</option>
											</>
										)}
										{
											formData.issue_type === "Other" && (
												<>
													{navigate('/chat')}
												</>
											)
										}
										{formData.issue_type === "Software" && (
											<>
												<option value="operating system">
													Operating System
												</option>
												<option value="application software">
													Application Software
												</option>
											</>
										)}
										{formData.issue_type === "Network" && (
											<>
												<option value="email issues">Email Issues</option>
												<option value="internet connection problems">
													Internet Connection Problems
												</option>
											</>
										)}
									</select>
									{formData.sub_category && automaticWorkflow && automaticWorkflow.length > 0 && (
										<>
											<div className="indicator mt-8 pt-4">
												<span className="indicator-item badge badge-secondary">SOLUTIONS</span>
												<h3 className="text-center text-lg sm:text-l md:text-2xl lg:text-3xl xl:text-4xl font-bold">
													Try one of these fixes first:
												</h3>
											</div>
											<div className="textarea flex w-full my-5">
												<ul className="list-disc pl-5">
													{automaticWorkflow.map((fix, index) => (
														<li key={index}>{fix}</li>
													))}
												</ul>
											</div>
										</>
									)}
									{formData.sub_category && automaticWorkflow !== null && (
										<>
											<textarea
												className="textarea textarea-success flex w-full my-5"
												placeholder="Describe the problem..."
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											></textarea>
										</>
									)}
								</div>
							)}
							<div className="form-control mt-1">
								{!isPending ? (
									<button className="btn btn-success" onClick={handleButtonClick}>
										<SaveIcon />
										Create
									</button>
								) : (
									<button className="btn btn-success" disabled={true}>
										<SaveIcon />
										Creating Ticket
										<span className="loading loading-spinner loading-xs m;-4"></span>
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
}
