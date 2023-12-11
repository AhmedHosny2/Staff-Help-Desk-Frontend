import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupComponent() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('User');
	const [signingup, setSigningup] = useState(false);

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [statusText, setStatusText] = useState('');
	const [message, setMessage] = useState('');

	const handleSignupClick = async () => {
		setSigningup(true);

		const body = {
			firstName,
			lastName,
			phoneNumber,
			address,
			role: role.toLowerCase(),
			email,
			password,
		};

		const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
			process.env.REACT_APP_USERS_URL + 'signup',
			'POST',
			body
		);

		setError(err);
		setIsPending(isPen);
		setData(newData);
		setStatus(newStatus);
		setStatusText(newStatusText);
		setMessage(newMessage);

		if (newStatusText === 'success') {
			// Step 1: Save toast id using var
			var toastId = toast.success('Successfully Signed Up', getToastStyle());
			setTimeout(() => {
				navigate('/login');
				setSigningup(false);
			}, 4000);
		} else {
			// Step 2: This is the other toast (for error)
			toastId = toast.error(newMessage, getToastStyle());
			setSigningup(false);
		}
		// Step 3: always call this function
		removeToast(toast, toastId);
	};

	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">New Here?</h1>
						<p className="py-6">Signup and create an account for free.</p>
					</div>
					<div className="card shrink-0 w-full max-w-3xl shadow-2xl">
						<div className="card-body">
							<div className="flex lg:flex-row flex-col">
								<div className="flex-1 lg:mr-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text">First Name</span>
										</label>
										<input
											type="text"
											placeholder="John"
											className="input input-bordered"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Last Name</span>
										</label>
										<input
											type="text"
											placeholder="Doe"
											className="input input-bordered"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className="flex lg:flex-row flex-col">
								<div className="flex-1 lg:mr-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Phone number</span>
										</label>
										<input
											type="text"
											placeholder="012345678901"
											className="input input-bordered"
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Address</span>
										</label>
										<input
											type="text"
											placeholder="jenkings street; building no. 34; 5th floor"
											className="input input-bordered"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="email@example.com"
									className="input input-bordered"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder=". . ."
									className="input input-bordered"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<select
								className="select select-bordered w-full max-w-xs"
								value={role}
								onChange={(e) => setRole(e.target.value)}
							>
								<option selected>User</option>
								<option>Agent1</option>
								<option>Agent2</option>
								<option>Agent3</option>
								<option>Manager</option>
								<option>Admin</option>
							</select>
							<div className="form-control mt-6">
								<button
									className="btn btn-primary"
									onClick={handleSignupClick}
									disabled={signingup}
								>
									{signingup ? (
										<>
											Signing Up
											<span className="loading loading-spinner loading-xs"></span>
										</>
									) : (
										'Signup'
									)}
								</button>
								<label className="">
									<a href="#" className="label-text-alt link link-hover">
										Already have an account? Login
									</a>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Step 4: Add Toaster Tag */}
			<Toaster />
		</>
	);
}
