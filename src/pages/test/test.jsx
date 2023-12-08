import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { customFetch } from "../../utils/Fetch";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: "0vw",
    transition: { delay: 0.5, duration: 0.4 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

export default function Test() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { err, isPen, newData, newStatus } = await customFetch(
          process.env.REACT_APP_USERS_URL,
          "GET"
        );

        setError(err);
        setIsPending(isPen);
        setData(newData);
        setStatus(newStatus);
      } catch (error) {
        // Handle any additional errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <motion.div
        className="bg-neutral h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>Welcome to the Test page</div>
        <div className="test">
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {data &&
            data.map((user) => <div key={user._id}>{user.firstName} </div>)}
        </div>
        <Link to="/home">Click here to navigate to Home page</Link>
      </motion.div>
    </>
  );
}
