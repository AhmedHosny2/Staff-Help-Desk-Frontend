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

const KnowledgeBase = () => {
  const [articles, setArticles] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { newData } = await customFetch(process.env.REACT_APP_KNOWLEDGEBASE_URL + '/getAll', 'GET');
        setArticles(newData);
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
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
            <span className="indicator-item badge badge-secondary">Knowledge Base</span>
            <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
              Explore our Knowledge Base
            </h2>
          </div>
          <Link to="#" className="link link-hover text-sm">
            Go to FAQs instead?
          </Link>
        </div>

        <div className="flex items-center justify-center mb-16">
          {isPending ? (
            <p>Loading articles...</p>
          ) : (
            <div className="join join-vertical w-[90vw]">
              {articles.map((article) => (
                <div key={article.id} className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name={`my-accordion-${article.id}`} />
                  <div className="collapse-title text-xl font-medium">{article.title}</div>
                  <div className="collapse-content">
                    <p>{article.content}</p>
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
