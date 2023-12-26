import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { customFetch } from '../../../utils/Fetch';
import { getToastStyle, removeToast } from '../../../utils/toastStyle';
import toast, { Toaster } from 'react-hot-toast';
import ProfileInfo from './profileInfo';

const defaultProfile = {
	_id: '123456789',
	firstName: 'John',
	lastName: 'Doe',
	email: 'john@example.com',
	password: 'John123',
	phoneNumber: '12345678901',
	address: 'Giu Street 56 Aprt.7',
	role: 'user',
	bio: '',
	links: {
		linkedin: '',
		youtube: '',
		facebook: '',
		instagram: '',
		twitter: '',
	},
};

export default function ProfileComponent({ setProfilePic }) {
	const [profileData, setProfileData] = useState(defaultProfile);
	const [isEditing, setIsEditing] = useState(false);
	const [editedBio, setEditedBio] = useState(null);
	const [linkName, setLinkName] = useState('');
	const [linkUrl, setLinkUrl] = useState('');
	const [addImage, setAddImage] = useState({ myFile: '' });
	const [added, setAdded] = useState(false);

	const handleLinkClick = (e, linkName, linkUrl) => {
		e.preventDefault();

		if (!isEditing) {
			const finalLink = (profileData.links && profileData.links[linkName.toLowerCase()]) || '';

			if (finalLink.trim() !== '') {
				if (!finalLink.startsWith('https://')) {
					window.open('https://' + finalLink, '_blank');
				} else {
					window.open(finalLink, '_blank');
				}
			}
		} else {
			setLinkName(linkName);

			const finalLink = (profileData.links && profileData.links[linkName.toLowerCase()]) || '';
			setLinkUrl(finalLink || profileData.links[linkName.toLowerCase()] || '');

			// Show the modal
			const modal = document.getElementById('my_modal_2');
			modal.showModal();
		}
	};

	const updateLinksObject = (linkName, linkUrl) => {
		// Make a copy of the profileData to avoid mutating the state directly
		const updatedProfileData = { ...profileData };

		// Update the link in the copied profileData with lowercase linkName
		updatedProfileData.links[linkName.toLowerCase()] = linkUrl;

		// Update the state with the modified profileData
		setProfileData(updatedProfileData);
	};

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleAddProfilePic = async (e) => {
		e.preventDefault();

		const body = addImage;

		try {
			const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
				process.env.REACT_APP_USERS_URL + 'profile/addProfilePic',
				'POST',
				body
			);

			if (newStatusText === 'success') {
				var toastId = toast.success('Your Profile is up to Date!', getToastStyle());
			} else {
				toastId = toast.error('Your image size is too large', getToastStyle());
			}
			removeToast(toast, toastId);
			setAdded(false);
			setProfilePic(newData.profilePic);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleProfilePicUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const base64 = await convertToBase64(file);
		setAddImage({ ...addImage, myFile: base64 });
		setAdded(true);
	};

	const handleDeleteProfilePic = async (e) => {
		e.preventDefault();

		try {
			const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
				process.env.REACT_APP_USERS_URL + 'profile/deleteProfilePic',
				'PUT'
			);

			if (newStatusText === 'success') {
				// Nullify the profilePic attribute in the local state
				setProfileData((prevProfileData) => ({
					...prevProfileData,
					profilePic: null,
				}));

				var toastId = toast.success('Your Profile is up to Date!', getToastStyle());
				setAdded(false);
				setProfilePic(null);
			} else {
				toastId = toast.error(newMessage, getToastStyle());
			}
			removeToast(toast, toastId);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const handleDisableMFA = async () => {
		try {
			const response = await customFetch(process.env.REACT_APP_USERS_URL + 'disableMfa', 'POST');
			var toastId = toast.success('MFA Disabled!', getToastStyle());
		} catch (error) {
			console.error('Error fetching data:', error);
			toastId = toast.error('Error...Could not disable MFA!', getToastStyle());
		}
		removeToast(toast, toastId);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_USERS_URL + 'profile',
					'GET'
				);

				setProfileData(newData);
				setEditedBio(newData.bio);
				setProfilePic(newData.profilePic);
				console.log(newData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [added, setProfilePic]);

	return (
		<>
			<div className="container mx-auto py-8 z-[-10]">
				<div className="grid grid-cols-4 lg:grid-cols-12 gap-6 px-4">
					<div className="col-span-4 sm:col-span-3">
						<div className="bg-neutral shadow rounded-lg p-6">
							<div className="flex flex-col items-center">
								{/* START PROFILE PICTURE PLACEHOLDER */}
								<div className="profilePic">
									<label htmlFor="file-upload">
										{!added && !profileData.profilePic ? (
											<div className="bg-neutral text-neutral-content rounded-full w-25">
												<svg
													width="140px"
													height="140px"
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
															className="fill-base-100"
														></path>
														<path
															d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
															className="fill-base-100"
														></path>
													</g>
												</svg>
											</div>
										) : (
											<img
												className="custom-file-upload border-4 border-secondary"
												src={addImage.myFile || profileData.profilePic}
												alt=""
											></img>
										)}
									</label>
									<input
										className="ppInput"
										type="file"
										lable="Image"
										name="myFile"
										id="file-upload"
										accept=".jpeg, .png, .jpg"
										onChange={(e) => handleProfilePicUpload(e)}
									/>
								</div>
								<>
									{added && (
										<button
											className="btn btn-xs btn-outline btn-primary btn-outline my-6"
											onClick={handleAddProfilePic}
										>
											Upload
										</button>
									)}
									{profileData.profilePic && (
										<button
											className="btn btn-xs btn-error btn-outline my-6"
											onClick={handleDeleteProfilePic}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
											Remove Profile Picture
										</button>
									)}
								</>

								{/* END PROFILE PICTURE PLACEHOLDER */}
								<h1 className="text-xl font-bold text-neutral-content">
									{profileData.firstName} {profileData.lastName}
								</h1>
								<div className="badge badge-xs badge-outline text-neutral-content my-2 py-2">
									{profileData._id}
								</div>
								<div className="badge badge-xs badge-outline text-neutral-content py-2">
									{profileData.role}
								</div>

								<div className="mt-6 flex flex-wrap gap-4 justify-center">
									<div className="collapse">
										<input type="checkbox" />
										<div className="collapse-title text-xl font-medium text-neutral-content">
											Customize your entire profile here!
										</div>

										<div className="collapse-content">
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Add a profile picture</div>
											</p>
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Update profile info</div>
											</p>
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Change your password</div>
											</p>
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Link your social media</div>
											</p>
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Add a profile picture</div>
											</p>
											<p className="text-neutral-content">
												<div className="badge badge-ghost">Add a profile picture</div>
											</p>
											<p className="text-neutral-content mt-2">
												Press <kbd className="kbd bg-neutral">Enter</kbd> in the About
												me field to write a new line
											</p>
											{profileData.pin ? (
												<>
													<button
														className="btn btn-wide btn-outline"
														onClick={handleDisableMFA}
													>
														Disable MFA
													</button>
												</>
											) : (
												<>
													<Link
														to="/mfa/enable-mfa"
														className="btn btn-wide btn-outline"
													>
														Enable MFA
													</Link>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-4 sm:col-span-9">
						<div className="bg-neutral shadow rounded-lg p-6">
							{profileData ? (
								<>
									<h2 className="text-xl font-bold mb-4 text-neutral-content">About Me</h2>
									{isEditing ? (
										<textarea
											className="textarea textarea-lg w-full text-sm"
											style={{
												height: '7rem',
												minHeight: '7rem',
												maxHeight: '10rem',
											}}
											placeholder="Bio"
											value={editedBio}
											onChange={(e) => setEditedBio(e.target.value)}
										></textarea>
									) : (
										<textarea
											className="textarea textarea-lg w-full text-sm"
											style={{
												height: '7rem',
												minHeight: '7rem',
												maxHeight: '10rem',
											}}
											placeholder="Bio"
											value={editedBio}
											onChange={(e) => setEditedBio(e.target.value)}
											disabled
										></textarea>
									)}

									<h3 className="font-semibold text-center mt-3 -mb-2 text-neutral-content">
										Find me on
									</h3>
									<div className="flex justify-center items-center gap-6 my-6">
										<Link
											className="text-base-100 hover:text-primary"
											aria-label="Visit TrendyMinds LinkedIn"
											href=""
											target="_blank"
											onClick={(e) => handleLinkClick(e, 'LinkedIn', linkUrl)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
												className="h-6"
											>
												<path
													fill="currentColor"
													d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
												></path>
											</svg>
										</Link>
										<Link
											className="text-base-100 hover:text-primary"
											aria-label="Visit TrendyMinds YouTube"
											href=""
											target="_blank"
											onClick={(e) => handleLinkClick(e, 'Youtube', linkUrl)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
												className="h-6"
											>
												<path
													fill="currentColor"
													d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
												></path>
											</svg>
										</Link>
										<Link
											className="text-base-100 hover:text-primary"
											aria-label="Visit TrendyMinds Facebook"
											href=""
											target="_blank"
											onClick={(e) => handleLinkClick(e, 'Facebook', linkUrl)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 320 512"
												className="h-6"
											>
												<path
													fill="currentColor"
													d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
												></path>
											</svg>
										</Link>
										<Link
											className="text-base-100 hover:text-primary"
											aria-label="Visit TrendyMinds Instagram"
											href=""
											target="_blank"
											onClick={(e) => handleLinkClick(e, 'Instagram', linkUrl)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
												className="h-6"
											>
												<path
													fill="currentColor"
													d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
												></path>
											</svg>
										</Link>
										<Link
											className="text-base-100 hover:text-primary"
											aria-label="Visit TrendyMinds Twitter"
											href=""
											target="_blank"
											onClick={(e) => handleLinkClick(e, 'Twitter', linkUrl)}
										>
											<svg
												className="h-6"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
											>
												<path
													fill="currentColor"
													d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
												></path>
											</svg>
										</Link>
									</div>

									<dialog id="my_modal_2" className="modal">
										<div className="modal-box">
											<h3 className="font-bold text-lg">
												Update {linkName}
												{"'s "} link?
											</h3>
											<div className="flex items-center justify-center mt-4">
												<input
													type="text"
													placeholder="Type here"
													className="input input-bordered input-xs w-full max-w-xs"
													value={linkUrl}
													onChange={(e) => setLinkUrl(e.target.value)}
												/>
											</div>
										</div>
										<form method="dialog" className="modal-backdrop">
											<button
												onClick={() => {
													document.getElementById('my_modal_2').close();
													updateLinksObject(linkName, linkUrl);
												}}
											>
												close
											</button>
										</form>
									</dialog>

									<ProfileInfo
										profileData={profileData}
										isEditing={isEditing}
										setIsEditing={setIsEditing}
										editedBio={editedBio}
									/>
								</>
							) : (
								<>
									<p>Loading...</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
}
