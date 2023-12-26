import React, { useState, useEffect } from 'react';
import botImg from '../../../assets/bot.jpg';

const TypewriterEffect = ({ text }) => {
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const intervalId = setInterval(() => {
				setDisplayText((prevText) => prevText + text[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			}, 30);

			return () => clearInterval(intervalId);
		}
	}, [text, currentIndex]);

	return <span>{displayText}</span>;
};

function MessageItem({ message }) {
	if (message.messageType === 'bot') {
		return (
			<div className={`flex gap-2.5 justify-start`}>
				<div className="flex flex-col gap-1 w-full max-w-[320px]">
					<div className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
						<div className="flex items-center space-x-2 rtl:space-x-reverse">
							<img
								className="w-8 h-8 rounded-full"
								src={botImg}
								alt={`Profile of Geekie Techie`}
							/>
							<div>
								<span className="text-sm font-semibold">{'Geekie Techie '}</span>
								<span className="text-sm font-normal text-base-300">{message.time}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl overflow-hidden bg-secondary">
						<p className="text-sm font-normal overflow-hidden overflow-ellipsis">
							<TypewriterEffect text={message.content} />
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`flex gap-2.5 justify-end`}>
			<div className="flex flex-col gap-1 w-full max-w-[320px]">
				<div className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
					<div></div>
					<div className="flex items-center space-x-2 rtl:space-x-reverse">
						<span className="text-sm font-normal text-base-300">{message.time}</span>
						<span className="text-sm font-semibold">{message.name}</span>
						<img
							className="w-8 h-8 rounded-full"
							src={message.image}
							alt={`Profile of ${message.name}`}
						/>
					</div>
				</div>
				<div className="flex flex-col leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl overflow-hidden bg-secondary">
					<p className="text-sm font-normal overflow-hidden overflow-ellipsis">
						{message.content}
					</p>
				</div>
			</div>
		</div>
	);
}

export default MessageItem;
