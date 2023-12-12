import React, { useState, useEffect } from 'react';

export default function ProfileInfo({ profileObject, isEditing, setIsEditing, editedBio }) {
	const [editedFirstName, setEditedFirstName] = useState(profileObject.firstname);
	const [editedLastName, setEditedLastName] = useState(profileObject.lastname);
	const [editedEmail, setEditedEmail] = useState(profileObject.email);
	const [editedPassword, setEditedPassword] = useState(profileObject.password);
	const [editedPhoneNumber, setEditedPhoneNumber] = useState(profileObject.phonenumber);
	const [editedAddress, setEditedAddress] = useState(profileObject.address);

	const generateStars = () => {
		return '*'.repeat(editedPassword.length);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleSaveClick = () => {
		// You would typically make a fetch request to the backend here
		// with the edited data. For now, let's just log the edited data.
		// console.log({
		// 	id,
		// 	firstName: editedFirstName,
		// 	lastName: editedLastName,
		// 	email: editedEmail,
		// 	password: editedPassword,
		// 	phoneNumber: editedPhoneNumber,
		// 	address: editedAddress,
		// });

		// Exit edit mode after saving
		setIsEditing(false);

		// You can also call a callback function to update the data in the parent component
		// onSave({
		// 	id,
		// 	firstName: editedFirstName,
		// 	lastName: editedLastName,
		// 	email: editedEmail,
		// 	password: editedPassword,
		// 	phoneNumber: editedPhoneNumber,
		// 	address: editedAddress,
		// });
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
									{editedPassword}
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
		</>
	);
}
