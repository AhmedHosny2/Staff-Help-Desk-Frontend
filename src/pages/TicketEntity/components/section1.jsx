import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { Trash } from 'react-bootstrap-icons';

export default function Section1({ data }) {
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
								<div className="badge badge-outline">{data.sub_category}</div>
							</h2>
						</div>
					</div>
					<figure className="m-6">
						<QRCode value={window.location.href} />
					</figure>
				</div>
				{data.userType === 'user' && (
					<div className="card-actions justify-end">
						<button
							className="btn btn-error absolute bottom-0 left-0"
							onClick={handleDeleteButtonClick}
						>
							<Trash size={35} />
							Delete
						</button>
					</div>
				)}
			</div>
		</>
	);
}
