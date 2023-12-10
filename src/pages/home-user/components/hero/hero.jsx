import { motion } from 'framer-motion';
import Card from '../card1/card1';
import homePets from '../../../../assets/herobg2.jpg';
import getSVGs from './heroSVGs';

const heroVariant = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { delay: 0.5, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
	},
};

const childCardVariant1 = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.1, duration: 0.5, ease: 'easeOut' },
	},
};
const childCardVariant2 = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' },
	},
};
const childCardVariant3 = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { delay: 0.7, duration: 0.5, ease: 'easeOut' },
	},
};
const childCardVariant4 = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: { delay: 1, duration: 0.5, ease: 'easeOut' },
	},
};

export default function Hero() {
	const { ticketsvg, chatsvg, notificationsvg, infosvg } = getSVGs();
	return (
		<>
			<motion.div
				className="hero"
				style={{
					backgroundImage: `url(${homePets})`,
					minHeight: '60vh',
				}}
				variants={heroVariant}
				initial="hidden"
				animate="visible"
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="">
						<div className="bringBack">
							<h1 className="mb-5 text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
								Welcome Back to DeskMate
							</h1>
							<p className="mb-5">
								As a <span className="text-secondary text-xl font-bold">USER</span>,
								discover a seamless ticketing experience and stay connected with DeskMate.
								Your go-to platform for managing and resolving <br />
								<span className="text-secondary text-xl font-bold">Software</span>
								{', '}
								<span className="text-secondary text-xl font-bold">Hardware</span>
								{' & '}
								<span className="text-secondary text-xl font-bold">Network</span>{' '}
								effortlessly.
							</p>
						</div>

						<div className="flex flex-wrap gap-6 justify-center">
							<motion.div variants={childCardVariant1}>
								<Card first={ticketsvg} second={'TICKETS'} />
							</motion.div>
							<motion.div variants={childCardVariant2}>
								<Card first={chatsvg} second={'CHATS'} />
							</motion.div>
							<motion.div variants={childCardVariant3}>
								<Card first={notificationsvg} second={'REMINDERS'} />
							</motion.div>
							<motion.div variants={childCardVariant4}>
								<Card first={infosvg} second={`KNOWLEDGE\nBASE`} />
							</motion.div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
