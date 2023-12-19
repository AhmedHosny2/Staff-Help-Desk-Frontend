import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const KnowledgeBase = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { newData } = await customFetch(process.env.REACT_APP_KNOWLEDGEBASE_URL + '/getAll', 'GET');
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

    const filteredArticles = articles.filter(article =>
        (article.category && article.category.includes(searchTerm.toLowerCase())) &&
        (selectedCategory ? article.category === selectedCategory : true) &&
        (article.subCategory && article.subCategory.includes(searchTerm.toLowerCase())) &&
        (selectedSubcategory ? article.subCategory === selectedSubcategory : true) &&
        (article.question && article.question.includes(searchTerm.toLowerCase())) &&
        (article.answer && article.answer.includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <motion.div variants={heroVariant} initial="hidden" animate="visible" className="mx-4 md:mx-8 lg:mx-16">
                <div className="flex flex-col items-center my-16 transform transition duration-1000 ease-in-out hover:scale-105">
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">Knowledge Base</span>
                        <div className="flex items-center justify-center space-x-4">
                            <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                                Explore our Knowledge Base
                            </h2>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                onChange={event => {
                                    if (event.target.value) {
                                        setSearchTerm(event.target.value.toLowerCase());
                                    } else {
                                        setSearchTerm('');
                                    }
                                }}
                            />
                            <select
                                className="border-2 border-gray-300 bg-white h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
                                onChange={event => setSelectedCategory(event.target.value)}
                                value={selectedCategory}
                            >
                                <option value="">All Categories</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Network">Network</option>
                            </select>
                            <select
                                className="border-2 border-gray-300 bg-white h-8 px-3 pr-6 rounded-lg text-sm focus:outline-none"
                                onChange={event => setSelectedSubcategory(event.target.value)}
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
                                        <option value="Internet Connection Problems">Internet Connection Problems</option>
                                        <option value="Website Errors">Website Errors</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                    <Link to="#" className="link link-hover text-sm">
                        Go to FAQs instead?
                    </Link>
                </div>

                <div className="flex items-center justify-center mb-16">
                    {isPending ? (
                        <p>Loading articles...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredArticles.map((article, index) => (
                                <div key={index} className="rounded overflow-hidden shadow-lg p-6 bg-white transform transition duration-700 ease-in-out hover:scale-105">
                                    <h2 className="font-bold text-xl mb-2">{article.question}</h2>
                                    <p className="text-gray-700 text-base">{article.answer}</p>
                                    <div className="mt-4">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{article.category}</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{article.subCategory}</span>
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

export default KnowledgeBase;
