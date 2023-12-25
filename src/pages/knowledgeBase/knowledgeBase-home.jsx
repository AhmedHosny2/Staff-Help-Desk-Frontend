import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { customFetch } from '../../utils/Fetch';
import Fuse from 'fuse.js';

const heroVariant = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { delay: 1, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
	},
};

const KnowledgeBase = () => {
	const [articles, setArticles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSubcategory, setSelectedSubcategory] = useState('');
	const [isPending, setIsPending] = useState(true);
	const [fuse, setFuse] = useState(null);
	const [filteredData, setFilteredData] = useState([]);

	const getRole = () => {
		var role = localStorage.getItem('role');
		if (role.startsWith('agent')) {
			return (role = role.slice(0, -1));
		}
		return role;
	};
	const role = getRole();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { newData } = await customFetch(
					process.env.REACT_APP_KNOWLEDGEBASE_URL + '/getAll',
					'GET'
				);
				const sortedData = newData.sort((a, b) => b.viewcount - a.viewcount);

				setArticles(sortedData);
				setIsPending(false);
			} catch (error) {
				console.error('Error fetching articles:', error);
				setIsPending(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (articles.length > 0) {
			const newFuse = new Fuse(articles, {
				includeScore: true,
				threshold: 0.3,
				keys: ['category', 'subCategory', 'question', 'answer'],
			});
			setFuse(newFuse);
		}
	}, [articles]);

	const handleSearchTermChange = (event) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);

		if (fuse) {
			const results = fuse.search(searchTerm);
			const filteredData = results.map((result) => result.item);
			setFilteredData(filteredData);
		}
	};

	const handleCategoryChange = (event) => {
		const value = event.target.value;
		setSelectedCategory(value);
		if (value === '') {
			setSelectedCategory('');
			setSelectedSubcategory('');
		}
	};

	const handleSubcategoryChange = (event) => {
		const value = event.target.value;
		setSelectedSubcategory(value);
		if (value === '') {
			setSelectedSubcategory('');
		}
	};

	const filteredArticles = filteredData.length > 0 ? filteredData : articles;

	const finalArticles = filteredArticles.filter(
		(article) =>
			(selectedCategory ? article.category === selectedCategory : true) &&
			(selectedSubcategory ? article.subCategory === selectedSubcategory : true)
	);

	return (
		<>
			<div className="flex flex-col block wrap items-center my-16 transform transition duration-1000 ease-in-out hover:scale-105">
				<div className="indicator">
					<span className="indicator-item badge badge-secondary">Knowledge Base</span>
					<div className="flex flex-col xl:flex-row items-center justify-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
						<h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
							Explore our Knowledge Base
						</h2>
						<div className="relative">
							<input
								type="text"
								placeholder="Search..."
								className="border-2.1 border-gray-300 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
								value={searchTerm}
								onChange={handleSearchTermChange}
							/>
							<span className="absolute right-0 top-0 mt-3 mr-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M13.707 12.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L11.586 13H7a1 1 0 010-2h4.586l-1.293-1.293a1 1 0 011.414-1.414l3 3zM10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 100-12 6 6 0 000 12z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						</div>
						<select
							className="border-2 border-gray-300 h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
							onChange={handleCategoryChange}
							value={selectedCategory}
						>
							<option value="">All Categories</option>
							<option value="Hardware">Hardware</option>
							<option value="Software">Software</option>
							<option value="Network">Network</option>
						</select>
						<select
							className="border-2 border-gray-300 h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
							onChange={handleSubcategoryChange}
							value={selectedSubcategory}
						>
							<option value="">All Subcategories</option>
							{selectedCategory === 'Hardware' && (
								<>
									<option value="Desktops">Desktops</option>
									<option value="Laptops">Laptops</option>
									<option value="Printers">Printers</option>
									<option value="Servers">Servers</option>
									<option value="Networking Equipment">Networking Equipment</option>
								</>
							)}
							{selectedCategory === 'Software' && (
								<>
									<option value="Operating System">Operating System</option>
									<option value="Application Software">Application Software</option>
									<option value="Custom Software">Custom Software</option>
									<option value="Integration Issues">Integration Issues</option>
								</>
							)}
							{selectedCategory === 'Network' && (
								<>
									<option value="Email Issues">Email Issues</option>
									<option value="Internet Connection Problems">
										Internet Connection Problems
									</option>
									<option value="Website Errors">Website Errors</option>
								</>
							)}
						</select>
					</div>
				</div>
				<Link to={'/home/' + role} className="link link-hover text-sm">
					Go to FAQs instead?
				</Link>
			</div>
			<div className="container block wrap mx-auto px-4 sm:px-6 lg:px-0">
				<motion.div
					variants={heroVariant}
					initial="hidden"
					animate="visible"
					className="mx-4 md:mx-8 lg:mx-16"
				>
					<div className="flex items-center justify-center mb-16">
						{isPending ? (
							<p>Loading articles...</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{finalArticles.map((article, index) =>
									article.question &&
									article.answer &&
									article.category &&
									article.subCategory ? (
										<div
											key={index}
											className="rounded overflow-hidden shadow-lg p-6 bg-secondary transform transition duration-700 ease-in-out hover:scale-105"
										>
											<h2 className="font-bold text-xl mb-2">{article.question}</h2>
											<p className="">{article.answer}</p>
											<div className="mt-4">
												<span className="inline-block bg-base-100 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
													{article.category}
												</span>
												<span className="inline-block bg-base-100 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
													{article.subCategory}
												</span>
											</div>
										</div>
									) : null
								)}
							</div>
						)}
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default KnowledgeBase;
