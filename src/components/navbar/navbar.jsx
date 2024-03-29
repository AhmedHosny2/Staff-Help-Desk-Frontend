import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { customFetch } from '../../utils/Fetch';
import SubLinks from './components/subLinks';
import Bot from '../Bot/Bot';

const navigationVariants = {
	hidden: {
		y: '-20vh',
	},
	visible: {
		y: '0vh',
		transition: {
			duration: 3000,
			delay: 0,
			type: 'spring',
			stiffness: 300,
		},
	},
	exit: {
		y: '-20vh',
		transition: {
			delay: 0,
			type: 'spring',
			stiffness: 400,
		},
	},
};

export default function NavbarComponent({ profilePic, setProfilePic  }) {
	 //noti
	 const [notifications, setNotifications] = useState([]);
	 const [open, setOpen] = useState(false);
   
	
	 const displayNotification = ({ senderName, type }) => {
	   return (
		 <span className="notification">{`${senderName} ${type}  Ticket.`}</span>
	   );
	 };
   
	 const handleRead = () => {
	   setNotifications([]);
	   setOpen(false);
	 };
	 //noti end
	const navigate = useNavigate();
	const [loggingout, setLoggingout] = useState(false);

	const getRole = () => {
		var role = localStorage.getItem('role');
		if (role.startsWith('agent')) {
			return (role = role.slice(0, -1));
		}
		return role;
	};
	const role = getRole();

	const handleLogoutClick = async (e) => {
		e.preventDefault();
		setLoggingout(true);

		try {
			// const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
			// 	process.env.REACT_APP_USERS_URL + 'logout',
			// 	'GET'
			// );
			document.cookie = `authcookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
			document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

			localStorage.removeItem('loggedin');
			setTimeout(() => {
				navigate('/');
				setLoggingout(false);
			}, 2500);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_USERS_URL + 'profile',
					'GET'
				);

				setProfilePic(newData.profilePic);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [setProfilePic]);

	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const closeModalESC = (e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};

	return (
		<>
			<motion.div variants={navigationVariants} initial="hidden" animate="visible" exit="exit">
				<div className="navbar bg-secondary">
					<div className="navbar-start">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
							>
								<SubLinks />
							</ul>
						</div>
						<Link to={'/home/' + role} className="btn btn-ghost text-xl">
							DeskMate
						</Link>
						<div className="navbar-center hidden lg:flex">
							<ul className="menu menu-horizontal px-1">
								<SubLinks />
							</ul>
						</div>
					</div>

					<div className="navbar-end">
						<button
							className="btn btn-ghost btn-circle"
							onClick={openModal}
							onKeyDown={closeModalESC}
						>
							<SmartToyIcon />
						</button>
					  {/* NOTIFICATION DROP DOWN START */}
					  <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator" onClick={() => setOpen(!open)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>

                  <span
                    className="badge badge-sm indicator-item"
                    onClick={() => setOpen(!open)}
                  >
                    {Math.min(notifications.length, 1)}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[4] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="notifDrop">
                  <div className="card-body">
                    {notifications
                      .slice(0, 1)
                      .map((n) => displayNotification(n))}
                    <div className="card-actions">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={handleRead}
                      >
                        Clear Notifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* NOTIFICATION DROP DOWN END */}
						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									{!profilePic ? (
										<svg
											width="40px"
											height="40px"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
											<g
												id="SVGRepo_tracerCarrier"
												stroke-linecap="round"
												stroke-linejoin="round"
											></g>
											<g id="SVGRepo_iconCarrier">
												<path
													d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
													className="fill-neutral-content"
												></path>
												<path
													d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
													className="fill-neutral-content"
												></path>
											</g>
										</svg>
									) : (
										<img
											className="custom-file-upload border-4 border-secondary"
											src={profilePic}
											alt=""
										></img>
									)}
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<Link to="/profile" className="justify-between">
										Profile
									</Link>
								</li>
								<li>
									{!loggingout ? (
										<Link onClick={handleLogoutClick}>Logout</Link>
									) : (
										<Link disabled>
											Logging Out
											<span className="loading loading-spinner loading-xs ml-4"></span>
										</Link>
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</motion.div>
			<Bot isModalOpen={isModalOpen} closeModal={closeModal} />
		</>
	);
}
