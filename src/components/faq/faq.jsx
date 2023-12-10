import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroVariant = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { delay: 3, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
	},
};

export default function Faq() {
	return (
		<>
			<motion.div variants={heroVariant} initial="hidden" animate="visible">
				<div className="flex flex-col items-center my-16">
					<div className="indicator">
						<span className="indicator-item badge badge-secondary">FAQ</span>
						<h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
							Frequently Asked Questions
						</h2>
					</div>
					<Link to="#" className="link link-hover text-sm">
						Go to knowledgebase instead?
					</Link>
				</div>
				<div className="flex items-center justify-center mb-16">
					<div className="join join-vertical w-[90vw]">
						<div className="collapse collapse-arrow join-item border border-base-300">
							<input type="radio" name="my-accordion-4" />
							<div className="collapse-title text-xl font-medium">Question 1</div>
							<div className="collapse-content">
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
									suscipit ipsum eaque quisquam minima iste quibusdam. Perspiciatis unde
									quisquam illum ut eius sit! Ratione recusandae quidem, laborum earum
									dicta officia.
								</p>
							</div>
						</div>
						<div className="collapse collapse-arrow join-item border border-base-300">
							<input type="radio" name="my-accordion-4" />
							<div className="collapse-title text-xl font-medium">Question 2</div>
							<div className="collapse-content">
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
									suscipit ipsum eaque quisquam minima iste quibusdam. Perspiciatis unde
									quisquam illum ut eius sit! Ratione recusandae quidem, laborum earum
									dicta officia.
								</p>
							</div>
						</div>
						<div className="collapse collapse-arrow join-item border border-base-300">
							<input type="radio" name="my-accordion-4" />
							<div className="collapse-title text-xl font-medium">Question 3</div>
							<div className="collapse-content">
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
									suscipit ipsum eaque quisquam minima iste quibusdam. Perspiciatis unde
									quisquam illum ut eius sit! Ratione recusandae quidem, laborum earum
									dicta officia.
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
