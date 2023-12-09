import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import imageFull from '../../../../assets/desk.jpg';
import imageBottom from '../../../../assets/desk-parallax.png';

export default function LandingParallax() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});
	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
	const textY = useTransform(scrollYProgress, [0, 1], ['-400%', '700%']);

	return (
		<>
			<div
				ref={ref}
				className="w-full h-screen lg:h-[120rem] overflow-hidden relative grid place-items-center"
			>
				<motion.h1
					style={{ y: textY }}
					className="font-bold text-white text-7xl sm:text-9xl relative z-10"
				>
					DESKMATE
				</motion.h1>

				<motion.div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `url(${imageFull})`,
						backgroundPosition: 'top', // Change 'bottom' to 'top'
						backgroundSize: 'cover',

						y: backgroundY,
					}}
				/>
				<div
					className="absolute inset-0 z-20"
					style={{
						backgroundImage: `url(${imageBottom})`,
						backgroundPosition: 'top', // Change 'bottom' to 'top'
						backgroundSize: 'cover',
					}}
				/>
			</div>
		</>
	);
}
