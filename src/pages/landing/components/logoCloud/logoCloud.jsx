import './logoCloud.css';
import React from 'react';
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	useMotionValue,
	useVelocity,
	useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';

const ParallaxText = ({ children, baseVelocity = 100 }) => {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
		clamp: false,
	});

	const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

	const directionFactor = React.useRef(1);
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		baseX.set(baseX.get() + moveBy);
	});

	return (
		<div className="parallax">
			<motion.div className="scroller" style={{ x }}>
				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>
			</motion.div>
		</div>
	);
};

export default function LogoCloud() {
	const imageUrls = [
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/8.png',
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/2.png',
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/7.png',
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/1.png',
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/4.png',
		'https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/5.png',
	];

	return (
		<>
			<h2 className="text-center mb-16 text-3xl font-bold text-neutral-content">
				Trusted by <u className="">2,000,000+</u> users
			</h2>
			<section>
				<ParallaxText baseVelocity={-2}>
					<div className="flex">
						{imageUrls.map((url, index) => (
							<img
								key={index}
								src={url}
								alt={`Image ${index + 1}`}
								className="max-w-[180px] dark:brightness-150 mx-2"
							/>
						))}
					</div>
				</ParallaxText>
				<ParallaxText baseVelocity={2}>
					<div className="flex">
						{imageUrls.map((url, index) => (
							<img
								key={index}
								src={url}
								alt={`Image ${index + 1}`}
								className="max-w-[180px] dark:brightness-150 mx-2"
							/>
						))}
					</div>
				</ParallaxText>
			</section>
		</>
	);
}
