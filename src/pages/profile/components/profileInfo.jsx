import React, { useState, useEffect } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfileInfo({ profileData, isEditing, setIsEditing, editedBio }) {
	const [editedFirstName, setEditedFirstName] = useState(profileData.firstName);
	const [editedLastName, setEditedLastName] = useState(profileData.lastName);
	const [editedEmail, setEditedEmail] = useState(profileData.email);
	const [editedPassword, setEditedPassword] = useState('');
	const [editedPhoneNumber, setEditedPhoneNumber] = useState(profileData.phonenumber);
	const [editedAddress, setEditedAddress] = useState(profileData.address);

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [statusText, setStatusText] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		// Update state values when profileData changes
		setEditedFirstName(profileData.firstName);
		setEditedLastName(profileData.lastName);
		setEditedEmail(profileData.email);
		setEditedPassword('');
		setEditedPhoneNumber(profileData.phoneNumber);
		setEditedAddress(profileData.address);
	}, [profileData]);

	const generateStars = () => {
		return '*'.repeat(6);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleSaveClick = async () => {
		setIsEditing(false);

		const body = {
			firstName: editedFirstName,
			lastName: editedLastName,
			email: editedEmail,
			password: editedPassword,
			phoneNumber: editedPhoneNumber,
			address: editedAddress,
			bio: editedBio,
			links: profileData.links,
		};

		const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
			process.env.REACT_APP_USERS_URL + 'profile',
			'PUT',
			body
		);

		setError(err);
		setIsPending(isPen);
		setData(newData);
		setStatus(newStatus);
		setStatusText(newStatusText);
		setMessage(newMessage);

		if (newStatusText === 'success') {
			var toastId = toast.success('Your Profile is up to Date!', getToastStyle());
		} else {
			toastId = toast.error(newMessage, getToastStyle());
		}
		removeToast(toast, toastId);
	};

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-xl font-bold text-neutral-content">Profile Info</h1>
				<div>
					{isEditing ? (
						<button onClick={handleSaveClick} className="btn btn-primary">
							Save
						</button>
					) : (
						<button onClick={handleEditClick} className="btn btn-outline btn-primary">
							Edit
						</button>
					)}
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">First Name</span>
					</label>
					{isEditing ? (
						<input
							type="text"
							value={editedFirstName}
							onChange={(e) => setEditedFirstName(e.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					) : (
						<input
							type="text"
							placeholder={editedFirstName}
							className="input input-bordered w-full max-w-xs"
							disabled
						/>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Last Name</span>
					</label>
					{isEditing ? (
						<input
							type="text"
							value={editedLastName}
							onChange={(e) => setEditedLastName(e.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					) : (
						<input
							type="text"
							placeholder={editedLastName}
							className="input input-bordered w-full max-w-xs"
							disabled
						/>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Email</span>
					</label>
					{isEditing ? (
						<input
							type="email"
							value={editedEmail}
							onChange={(e) => setEditedEmail(e.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					) : (
						<input
							type="text"
							placeholder={editedEmail}
							className="input input-bordered w-full max-w-xs"
							disabled
						/>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Password</span>
					</label>
					{isEditing ? (
						<input
							type="password"
							value={editedPassword}
							onChange={(e) => setEditedPassword(e.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					) : (
						<div className="diff h-[3rem] w-[20rem] rounded-[1rem]">
							<div className="diff-item-1">
								<div className="bg-primary text-primary-content text-md grid place-content-center">
									hidden
								</div>
							</div>
							<div className="diff-item-2">
								<div className="bg-base-200 text-xl grid place-content-center">
									{generateStars()}
								</div>
							</div>
							<div className="diff-resizer"></div>
						</div>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Phone Number</span>
					</label>
					{isEditing ? (
						<input
							type="tel"
							value={editedPhoneNumber}
							onChange={(e) => setEditedPhoneNumber(e.target.value)}
							className="input input-bordered w-full max-w-xs"
						/>
					) : (
						<input
							type="text"
							placeholder={editedPhoneNumber}
							className="input input-bordered w-full max-w-xs"
							disabled
						/>
					)}
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Address</span>
					</label>
					{isEditing ? (
						<input
							type="text"
							value={editedAddress}
							onChange={(e) => setEditedAddress(e.target.value)}
							className="input input-bordered w-full max-w-[32rem]"
						/>
					) : (
						<input
							type="text"
							placeholder={editedAddress}
							className="input input-bordered w-full max-w-[32rem]"
							disabled
						/>
					)}
				</div>
			</div>
			<Toaster />
		</>
	);
}
