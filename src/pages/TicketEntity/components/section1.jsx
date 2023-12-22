import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { Trash } from 'react-bootstrap-icons';
import React, { useEffect } from 'react';

export default function Section1({ data }) {
	const [selectedRating, setSelectedRating] = useState(3); // Default to the third star
	const handleRatingChange = async (e) => {
		const rating = e.target.value;
		setSelectedRating(rating);
		console.log('Selected Rating:', rating);
		const id = window.location.pathname.split('/')[2];
		const body = {
			rating: rating,
			ticketId: id,
		};
		const { newData } = await customFetch(
			process.env.REACT_APP_TICKETS_URL + '/rateTicket',
			'PUT',
			body
		);
		console.log('newData', newData);
		// You can perform additional actions here based on the selected rating
	};

	const navigate = useNavigate();
	const id = window.location.pathname.split('/')[2];
	const [userType, setUserType] = useState('');

	const handleDeleteButtonClick = (e) => {
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_TICKETS_URL + '/' + id,
					'DELETE'
				);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
		navigate('/ticket');
	};

	return (
		<>
			<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
				<div className="card w-w-full xl:w-10/12 bg-base-200 shadow-xl">
					<div className="card-body">
						<div className="tooltip" data-tip="Issue type">
							<h2 className="card-title">{data.issue_type}</h2>
						</div>
						<div className="tooltip tooltip-bottom" data-tip="Category">
							<h2 className="card-title">
								<div className="badge badge-outline h-12 lg:h-5">{data.sub_category}</div>
								{data.userType === 'user' && (
									<div className="card-actions justify-end">
										<button
											className="btn btn-error absolute bottom-0 right-0"
											onClick={handleDeleteButtonClick}
										>
											<Trash size={35} />
											Delete
										</button>
									</div>
								)}
							</h2>
						</div>
					</div>

					<figure className="m-6">
						<QRCode value={window.location.href} />
					</figure>
					<div className="flex justify-center items-center">
						{data.userType === 'user' && (
							<div className="rating rating-lg mb-6">
								<input type="radio" name="rating-9" className="rating-hidden" />
								<input
									type="radio"
									name="rating-9"
									className="mask mask-star-2"
									value={1}
									onClick={handleRatingChange}
								/>
								<input
									type="radio"
									name="rating-9"
									className="mask mask-star-2"
									checked
									value={2}
									onClick={handleRatingChange}
								/>
								<input
									type="radio"
									name="rating-9"
									className="mask mask-star-2"
									value={3}
									onClick={handleRatingChange}
								/>
								<input
									type="radio"
									name="rating-9"
									className="mask mask-star-2"
									value={4}
									onClick={handleRatingChange}
								/>
								<input
									type="radio"
									name="rating-9"
									className="mask mask-star-2"
									value={5}
									onClick={handleRatingChange}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
