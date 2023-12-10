import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const animateOnScroll = (controls, delay) => {
	controls.start({
		opacity: 1,
		x: 0,
		transition: { duration: 0.8, delay },
	});
};

export default function Features() {
	const timelineStartControls = useAnimation();
	const timelineEndControls = useAnimation();

	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight;

			const timelineStartElement = document.querySelector('.timeline-start');
			const timelineEndElement = document.querySelector('.timeline-end');

			const timelineStartOffset = timelineStartElement
				? timelineStartElement.getBoundingClientRect().top
				: 0;

			const timelineEndOffset = timelineEndElement
				? timelineEndElement.getBoundingClientRect().top
				: 0;

			if (timelineStartOffset < windowHeight * 0.8) {
				animateOnScroll(timelineStartControls, 0.1);
			}

			if (timelineEndOffset < windowHeight * 0.8) {
				animateOnScroll(timelineEndControls, 0.4); // Adjust the delay as needed
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Trigger the animation on initial load

		return () => window.removeEventListener('scroll', handleScroll);
	}, [timelineStartControls, timelineEndControls]);

	return (
		<>
			<h2 className="text-center my-16 text-3xl font-bold text-neutral-content">Features</h2>
			<div className="max-w-5xl mx-auto flex items-center justify-center sm:w-90 md:w-70">
				<ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
					<li>
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<motion.div
							className="timeline-start md:text-end mb-10"
							// initial={{ opacity: 0, x: -50 }}
							// animate={timelineStartControls}
						>
							<div className="text-lg font-black">Efficient Ticketing System</div>
							Seamlessly report hardware, software, or network issues with detailed
							subcategories.Experience a streamlined ticketing system to report and track
							issues efficiently. Categorize problems accurately for a faster resolution by
							our dedicated support team.
						</motion.div>
						<hr />
					</li>
					<li>
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<motion.div
							className="timeline-end mb-10"
							// initial={{ opacity: 0, x: 50 }}
							// animate={timelineEndControls}
						>
							<div className="text-lg font-black">Intelligent Chat Support</div>
							Initiate a chat with our AI Chatbot Assistant to troubleshoot and resolve
							issues autonomously. Our advanced AI chatbot provides instant assistance,
							analyzing problems and offering solutions. If needed, seamlessly transition to
							a chat with a live agent for personalized support.
						</motion.div>
						<hr />
					</li>
					<li>
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<motion.div
							className="timeline-start md:text-end mb-10"
							// initial={{ opacity: 0, x: -50 }}
							// animate={timelineStartControls}
						>
							<div className="text-lg font-black">Collaborative User Chat</div>
							Engage in real-time chats with other users, fostering collaboration and
							knowledge sharing. Enhance communication within the community by chatting with
							other users, exchanging insights, and checking profiles for effective
							collaboration.
						</motion.div>
						<hr />
					</li>
					<li>
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<motion.div
							className="timeline-end mb-10"
							// initial={{ opacity: 0, x: 50 }}
							// animate={timelineEndControls}
						>
							<div className="text-lg font-black">Comprehensive Knowledge Base</div>
							Access a vast knowledge base filled with frequently asked questions for quick
							problem-solving. Dive into our extensive knowledge base to find solutions to
							common issues. Quickly search and discover answers to FAQs, empowering users
							with self-service capabilities.
						</motion.div>
						<hr />
					</li>
					<li>
						<hr />
						<div className="timeline-middle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-5 w-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<motion.div
							className="timeline-start md:text-end mb-10"
							// initial={{ opacity: 0, x: -50 }}
							// animate={timelineStartControls}
						>
							<div className="text-lg font-black">Notifications</div>
							Receive tailored in-app and email notifications about important updates and
							announcements. Stay informed with custom notifications, ensuring you never miss
							critical updates. Personalize your notification preferences to align with your
							workflow and communication needs.
						</motion.div>
					</li>
				</ul>
			</div>
		</>
	);
}
