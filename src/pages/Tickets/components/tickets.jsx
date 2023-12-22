import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import TicketEntity from '../../TicketEntity/ticketEntity';
import { set } from 'animejs';
import React from 'react';
export default function TicketComponent() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggingin, setLoggingin] = useState(false);

	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [statusText, setStatusText] = useState('');
	const [message, setMessage] = useState('');
	const [userType, setUserType] = useState('');
	// put this in use effect
	useEffect(() => {
		setUserType(localStorage.getItem('role'));
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_TICKETS_URL + '/getAgentTickets',
					'GET'
				);
				await setData(newData);
				console.log(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);
	const handleEmailClick = (e) => {
		window.location.href = `mailto:${e.target.value}`;
	};
	const handleIDClick = (e) => {
		navigate(`/ticketEntity/${e.target.value}`);
	};
	return (
		<>
			{/* <div className="badge bg-base-300">Pending</div>
      <div className="badge badge-accent ">Open</div>
      <div className="badge bg-neutral text-base-300">Closed</div>
      <Toaster /> */}
			{/*
      
      tickets for admin he can see all the tickets  ========================

        REQUESTER : PIC , NAME , EMAIL 
        SUBJECT : TITLE 
        AGENT : AGENT NAME 
        STATUS : STATUS



*/}
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							{userType === 'agent' && (
								<React.Fragment>
									<th>REQUESTER</th>
									<th>SUBJECT</th>
									<th>PRIORITY</th>
									<th>ID</th>
								</React.Fragment>
							)}

							{(userType === 'manger' || userType === 'admin') && (
								<React.Fragment>
									<th>User</th>
									<th>AGENT</th>
									<th>PRIORITY</th>
									<th>STATUS</th>
									<th>CREATION</th>
									<th>ID</th>
								</React.Fragment>
							)}

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* we should iterate over the data here  */}
            {data &&
              data.map((ticketData) => (
                <tr key={ticketData.userData._id}>
                  {/* user / resquester  for ( admin / manager / agent ) */}
                  {(userType === "manager" || userType === "admin" || userType === "agent") && (
  <React.Fragment>
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              src={ticketData.userData.profilePic}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div>
          <div className="font-bold">
            {ticketData.userData.firstName + " " + ticketData.userData.lastName}
          </div>
          <div
            className="text-black-400 hover:underline"
            onClick={handleEmailClick}
          >
            {ticketData.userData.email}
          </div>
        </div>
      </div>
    </td>
  </React.Fragment>
)}


                  <td>
                    {ticketData.ticket.title}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {ticketData.ticket.issue_type}
                    </span>
                  </td>
                  <td>
                    {ticketData.ticket.ticketPriority === "low" && (
                      <div className="badge bg-success">Low</div>
                    )}
                    {ticketData.ticket.ticketPriority === "medium" && (
                      <div className="badge badge-warning">Medium</div>
                    )}
                    {ticketData.ticket.ticketPriority === "high" && (
                      <div className="badge bg-error">High</div>
                    )}
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs "
                      value={ticketData.ticket._id}
                      onClick={handleIDClick}
                    >
                      {ticketData.ticket._id}
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>REQUESTER</th>
              <th>SUBJECT</th>
              <th>PRIORITY</th>
              <th>ID</th>

							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>{' '}
			<Toaster />
		</>
	);
}
