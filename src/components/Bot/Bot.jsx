import React, { useEffect, useState, useRef } from 'react';
import { customFetch } from '../../utils/Fetch';
import defaultProfile from '../../assets/defaultProfile.jpg';
import MessageItem from './Components/BotMessage';

function Bot({ isModalOpen, closeModal }) {
	const [newMessage, setNewMessage] = useState('');
	const now = new Date();
	const options = { hour: 'numeric', minute: 'numeric', hour12: true };
	const formattedTime = now.toLocaleTimeString(undefined, options);
	const [profile, setProfile] = useState('');
	const [isLoading, setIsloading] = useState(false);
	const [messages, setMessages] = useState([
		{
			name: 'Geekie Techie',
			time: formattedTime,
			content: 'Heyyy.',
			messageType: 'bot',
		},
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_USERS_URL + 'profile',
					'GET'
				);
				setProfile(newData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [setProfile]);

	const messagesContainerRef = useRef(null);

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const handleSendMessage = async () => {
		if (newMessage === '') {
			return;
		}
		const newMessageObj = {
			name: profile.firstName + ' ' + profile.lastName,
			time: formattedTime,
			content: newMessage,
			messageType: 'user',
			image: profile.profilePic ? profile.profilePic : defaultProfile,
		};
		const userInput = newMessage;
		setNewMessage('');
		setIsloading(true);
		setMessages((prevMessages) => [...prevMessages, newMessageObj]);
		const { err, isPen, newData, newStatus, newStatusText } = await customFetch(
			process.env.REACT_APP_BOT_URL,
			'POST',
			{
				userMessage: userInput,
			}
		);
		const newBotMessageObj = {
			time: formattedTime,
			content: newData,
			messageType: 'bot',
		};
		setIsloading(false);
		setMessages((prevMessages) => [...prevMessages, newBotMessageObj]);
	};

	const handleEndterKey = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};
	return (
		<div>
			{isModalOpen && (
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen">
						<div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
						<div
							className="bg-base-100 rounded-lg p-8 z-20"
							style={{ width: '100vw', maxWidth: '800px' }}
						>
							<h2 className="text-2xl font-semibold text-center">
								Hi, I am Geekie Techie. How can I help you?
							</h2>
							<div
								className="bg-base-100 rounded-lg p-8 z-20 max-h-96 overflow-y-auto"
								ref={messagesContainerRef}
								style={{ width: '100%', maxWidth: '800px' }}
							>
								{messages.map((message, index) => (
									<div key={index} className="my-4 mx-2">
										<MessageItem message={message} index={index} />
									</div>
								))}
								{isLoading && (
									<div className="flex flex-col gap-2 ">
										<div className="flex gap-4 items-center">
											<div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
											<div className="flex flex-col">
												<div className="skeleton h-4 w-20"></div>
											</div>
										</div>
										<div className="skeleton h-12 w-80"></div>
									</div>
								)}
							</div>
							<div className="mt-4 flex">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									onKeyDown={handleEndterKey}
									className="p-2 border border-neutral focus:border-0 active:border-0 rounded-l-md w-full"
									placeholder="Ask me anything."
								/>
								<button
									className="btn btn-active font-extrabold py-2 px-4 rounded-r-md rounded-l-none"
									onClick={handleSendMessage}
								>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Bot;
