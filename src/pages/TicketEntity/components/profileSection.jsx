import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSection({ data }) {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate(`/profile`);
		//TODO add view profile page by id
		// navigate(`/profile/${data._id}`);
	};

	return (
		<>
			<h2 className="text-center mb-16 text-3xl font-bold">Ticket Belonging to . . .</h2>
			<div class="py-8 px-8 max-w-sm mx-auto rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
				<img
					class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
					src={data.profilePic}
					alt="ProfilePicture"
				/>
				<div class="text-center space-y-2 sm:text-left">
					<div class="space-y-0.5">
						<p class="text-lg font-semibold">{data.firstName}</p>
						<p class="font-medium">{data.lastName}</p>
					</div>
					<button className="btn btn-outline btn-primary" onClick={handleButtonClick}>
						View Profile
					</button>
				</div>
			</div>
		</>
	);
}
