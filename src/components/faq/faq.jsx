import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customFetch } from '../../utils/Fetch';

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

const Faq = () => {
	const [FAQs, setFAQs] = useState([]);
	const [isPending, setIsPending] = useState(true);


	useEffect(() => {
		const fetchData = async () => {
			try {
				const { newData } = await customFetch(process.env.REACT_APP_KNOWLEDGEBASE_URL + '/getAll', 'GET');
				// console.log('Fetched data:', newData);


				const popularFAQs = newData.filter(FAQ => FAQ.viewCount > 20);
				// console.log('Popular FAQs:', popularFAQs);

				const sortedFAQs = popularFAQs.sort((a, b) => b.viewcount - a.viewcount);
				// console.log('Sorted FAQs:', sortedFAQs);

				const topFAQs = sortedFAQs.slice(0, 4);
				// console.log('Top FAQs:', topFAQs); 

				setFAQs(topFAQs);
				setIsPending(false);
			} catch (error) {
				console.error('Error fetching FAQs:', error);
				setIsPending(false);
			}
		};

		fetchData();
	}, []);



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
					{isPending ? (
						<p>Loading FAQs...</p>
					) : (
						<div className="join join-vertical w-[90vw]">
							{FAQs.map((FAQ) => (
								<div key={FAQ.id} className="collapse collapse-arrow join-item border border-base-300">
									<input type="checkbox" name={`my-accordion-${FAQ.id || 'default'}`} />
									<div className="collapse-title text-xl font-medium">{FAQ.question}</div>
									<div className="collapse-content">
										<p>{FAQ.answer}</p>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</motion.div>
		</>
	);
};

export default Faq;
