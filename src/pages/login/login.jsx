// <<<<<<< HEAD
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { customFetch } from "../../utils/Fetch";

// import { useState } from "react";

// const containerVariants = {
//   hidden: {
//     x: "100vw",
//   },
//   visible: {
//     x: "0vw",
//     transition: { delay: 0.5, duration: 0.4 },
//   },
//   exit: {
//     x: "-100vw",
//     transition: { ease: "easeInOut" },
//   },
// };

// export default function Login() {
//   const [email, setEmail] = useState("test@example.com");
//   const [password, setPassword] = useState("pass1");
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const [status, setStatus] = useState(null);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const body = { email, password };

//     const { err, isPen, newData,newStatus } = await customFetch(
//       process.env.REACT_APP_USERS_URL+"login",
//       "POST",
//       body
//     );
//     setError(err);
//     setIsPending(isPen);
//     setData(newData);
//     setStatus(newStatus);

//     console.log(error, isPending, data,newStatus);
//   };

//   return (
//     <>
//       <motion.div
//         className="bg-neutral h-screen"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         <form onSubmit={handleSubmit}>
//           <label> email</label>
//           <input
//             type="text"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label> password</label>
//           <input
//             type="text"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">login</button>
//         </form>
//         <div className="test">
//           {error && <div>{error}</div>}
//           {isPending && <div>Loading...</div>}
//          </div>
//          {status===200 && <div>login success</div>}
//         <Link to="/home">Click here to navigate to Home page</Link>
//       </motion.div>
//     </>
//   );
// =======
import LoginComponent from './components/login';

export default function Login({ setLoggedin }) {
	return (
		<>
			<LoginComponent setLoggedin={setLoggedin} />
		</>
	);
}
