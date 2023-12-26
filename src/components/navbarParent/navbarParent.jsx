import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar/navbar";
import NavbarLanding from "../navbarLanding/navbarLanding";
import { io } from "socket.io-client";
export default function Navbar2({ profilePic, setProfilePic, socket }) {
  const loggedin = localStorage.getItem("loggedin");
  if (!socket) socket = io("http://localhost:5011");
  return (
    <>
      <div className="notifDrop">
        <AnimatePresence mode="wait">
          {loggedin ? (
            <motion.div key="loggedin">
              <Navbar
                profilePic={profilePic}
                setProfilePic={setProfilePic}
                socket={socket}
              />{" "}
            </motion.div>
          ) : (
            <motion.div key="loggedout">
              <NavbarLanding />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
