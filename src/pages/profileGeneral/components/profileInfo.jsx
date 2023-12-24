import React, { useState, useEffect } from 'react';

export default function ProfileInfo({ profileData }) {
	const [editedFirstName, setEditedFirstName] = useState(profileData.firstName);
	const [editedLastName, setEditedLastName] = useState(profileData.lastName);
	const [editedEmail, setEditedEmail] = useState(profileData.email);
	const [editedPassword, setEditedPassword] = useState('');
	const [editedPhoneNumber, setEditedPhoneNumber] = useState(profileData.phonenumber);
	const [editedAddress, setEditedAddress] = useState(profileData.address);

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

	return (
		<>
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-xl font-bold text-neutral-content">Profile Info</h1>
			</div>

			<div className="grid lg:grid-cols-2 gap-4">
				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">First Name</span>
					</label>

					<input
						type="text"
						placeholder={editedFirstName}
						className="input input-bordered w-full max-w-xs"
						disabled
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Last Name</span>
					</label>

					<input
						type="text"
						placeholder={editedLastName}
						className="input input-bordered w-full max-w-xs"
						disabled
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Email</span>
					</label>

					<input
						type="text"
						placeholder={editedEmail}
						className="input input-bordered w-full max-w-xs"
						disabled
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Phone Number</span>
					</label>

					<input
						type="text"
						placeholder={editedPhoneNumber}
						className="input input-bordered w-full max-w-xs"
						disabled
					/>
				</div>

				<div className="form-control">
					<label className="label">
						<span className="label-text text-neutral-content">Address</span>
					</label>

					<input
						type="text"
						placeholder={editedAddress}
						className="input input-bordered w-full max-w-[32rem]"
						disabled
					/>
				</div>
			</div>
		</>
	);
}
