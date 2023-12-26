import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { customFetch } from "./utils/Fetch.js";
// Imported Components

import NavbarParent from "./components/navbarParent/navbarParent.jsx";

// Imported Pages
import LandingPage from "./pages/landing/landing.jsx";
import UserHomePage from "./pages/home-user/home.jsx";
import AdminHomePage from "./pages/home-admin/home.jsx";
import AgentHomePage from "./pages/home-agent/home.jsx";
import ManagerHomePage from "./pages/home-manager/home.jsx";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import Profile from "./pages/profile/profile.jsx";
import ProfileGeneral from "./pages/profileGeneral/profile.jsx";
import Logs from "./pages/Logs/Logs.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import AddUser from "./pages/AddUser/AddUser.jsx";
import Report from "./pages/report/report.jsx";
import KnowledgeBaseHomePage from "./pages/knowledgeBase/knowledgeBase-home.jsx";
import MFAValidationComponent from "./pages/MFA/MFAValidationComponent.jsx";
import EnableMFAComponent from "./pages/MFA/EnableMFAComponent.jsx";
import ResetPasswordRequestComponent from "./pages/resetPassword/ResetPasswordComponent.jsx";
import ConfirmResetPasswordComponent from "./pages/resetPassword/ConfirmResetPasswordComponent.jsx";
import Ticket from "./pages/Tickets/tickets.jsx";
import CreatTicketComponent from "./pages/Tickets/components/createTicket.jsx";
import EditAutomaticWorkflow from "./pages/EditAutomaticWorkflow/EditAutomaticWorkflow.jsx";
import EditCustomWorkflow from "./pages/EditCustomWorkflow/EditCustomWorkflow.jsx";
import Error from "./pages/error/error.jsx";
import ChangeBrandPage from "./pages/ChangeBrand/ChangeBrand.jsx";
import TicketEntity from "./pages/TicketEntity/entityTicket.jsx";
/// osama imoprts ==================================
import { useSocketContext } from "./pages/chat/context/SocketContext.jsx";
import { ChatContext } from "./pages/chat/context/ChatContext.jsx";
import { socketEmitEvent } from "./pages/chat/socket/emit.js";
import LightChat from "./pages/lightChat/lightChat.jsx";
import ChatMain from "./pages/chat/chatMain.jsx";
import Bot from "./pages/bot/bot.jsx";
import { io } from "socket.io-client";

const privateRoutes = [
  `/home/user`,
  `/home/admin`,
  `/home/agent`,
  `/home/manager`,
  `/logs`,
  `/manageUsers`,
  `/AddUser`,
  `/profile`,
  `/report`,
  `/mfa/validate`,
  `/mfa/enable-mfa`,
  `/ticket`,
  `/ticketEntity`,
  `/createTicket`,
  `/knowledgeBase`,
  `/profileGeneral`,
  `/chat`,
  `/lightChat`,
  `/EditCustomWorkflow`,
  `/EditAutomaticWorkflow`,
  `/changeBrand`,
  "*",
];

const roleHierarchy = {
  user: [
    "/home/user",
    "/profile",
    `/profileGeneral`,
    "/mfa/validate",
    "/mfa/enable-mfa",
    "/ticketEntity/:id",
    "/createTicket",
    "/knowledgeBase",
    `/lightChat`,
    "/chat",
    "/ticket",
    `/changeBrand`,
  ],
  agent: [
    "/home/agent",
    "/profile",
    `/profileGeneral`,
    "/mfa/validate",
    "/mfa/enable-mfa",
    "/ticket",
    "/ticketEntity/:id",
    "/knowledgeBase",
    `/EditCustomWorkflow`,
    `/lightChat`,
    "/chat",
    `/changeBrand`,
  ],
  manager: [
    "/home/manager",
    "/logs",
    "/manageUsers",
    "/profile",
    `/profileGeneral`,
    "/report",
    "/mfa/validate",
    "/mfa/enable-mfa",
    "/ticket",
    "/ticketEntity/:id",
    "/knowledgeBase",
    "/EditAutomaticWorkflow",
    `/lightChat`,
    "/chat",
    `/changeBrand`,
  ],
  admin: [
    "/home/admin",
    "/logs",
    "/manageUsers",
    "/AddUser",
    "/profile",
    `/profileGeneral`,
    "/report",
    "/mfa/validate",
    "/mfa/enable-mfa",
    "/ticket",
    "/ticketEntity/:id",
    "/createTicket",
    "/knowledgeBase",
    "/test",
    `/changeBrand`,
    `/lightChat`,
    "/chat",
  ],
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("");
  //noti
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5011"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user.firstName);
  }, [socket, user]);

  //enc notif
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { newData } = await customFetch(
          process.env.REACT_APP_BRANDINFO_URL + "/getBrandInfo",
          "GET"
        );
        console.log("Fetched brand data:", newData[0]);
        setCurrentTheme(newData[0].theme);
        localStorage.setItem("theme", newData[0]);
        document
          .querySelector("html")
          .setAttribute("data-theme", newData[0].theme);
        console.log("documentTheme:", newData[0].theme);
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };
    fetchData();
  }, [currentTheme]);

  useEffect(() => {
    const needMFA = localStorage.getItem("MFA");

    if (needMFA) {
      navigate("/mfa/validate");
    }
    // Function to check if a cookie exists
    const checkCookie = (cookieName) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie && cookie.startsWith(`${cookieName}=`)) {
          return true; // Cookie exists
        }
      }
      return false; // Cookie does not exist
    };

    // Function to get the user's role from localStorage
    const getRole = () => {
      var role = localStorage.getItem("role");
      if (role && role.startsWith("agent")) {
        return role.slice(0, -1); // Remove the trailing character from the agent role
      }
      return role;
    };
    const role = getRole();

    // Check if the "authCookie" exists
    const isAuthCookieExists = localStorage.getItem("loggedin");
    if (!isAuthCookieExists) {
      localStorage.removeItem("loggedin");
    }
    // Define an object to represent the role hierarchy and allowed pages for each role

    // Check if the user is not logged in and is trying to access a private route
    if (
      !isAuthCookieExists &&
      privateRoutes.some((route) => location.pathname.startsWith(route)) &&
      !needMFA
    ) {
      navigate("/");
    }

    // Check if the user is logged in and trying to access a public route or not on a private route
    if (
      isAuthCookieExists &&
      !roleHierarchy[role]?.some((route) => location.pathname.startsWith(route))
    ) {
      // Construct the path based on the user's role
      const homePath = roleHierarchy[role]
        ? roleHierarchy[role][0]
        : "/profile";
      navigate(homePath);
    }
  }, [location.pathname, navigate]); // Include location.pathname and navigate in the dependency array
  //   const {
  //     socketConnect,
  //     socketValue: { socket, socketId },
  //   } = useSocketContext();
  //   useEffect(() => {
  //     if (!socketId) {
  //       socketConnect();
  //     }
  //   }, [socketId, socketConnect]);
  // // TODO : change the user id to the real one
  //   useEffect(() => {
  //     if (socketId) {
  //       socketEmitEvent(socket).userOnline("65814c05d03a8c84cff1b55f", socketId);
  //     }
  //   }, [socketId, socket]);

  return (
    <>
      <NavbarParent
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        socket={socket}
        user={user}
      />
      <AnimatePresence>
        <Routes location={location} key={location.key}>
          {/* PUBLIC ROUTES */}
          <Route
            path="/"
            element={<LandingPage />}
            socket={socket}
            user={user}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/resetPassword"
            element={<ResetPasswordRequestComponent />}
          />
          <Route
            path="/confirmReset/:token"
            element={<ConfirmResetPasswordComponent />}
          />

          {/* PRIVATE ROUTES */}
          <Route
            path="/home/user"
            element={<UserHomePage />}
            socket={socket}
            user={user}
          />
          <Route
            path="/home/admin"
            element={<AdminHomePage />}
            socket={socket}
            user={user}
          />
          <Route
            path="/home/agent"
            element={<AgentHomePage />}
            socket={socket}
            user={user}
          />
          <Route
            path="/home/manager"
            element={<ManagerHomePage />}
            socket={socket}
            user={user}
          />
          <Route path="/logs" element={<Logs />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route
            path="/profile"
            element={<Profile setProfilePic={setProfilePic} />}
          />
          <Route path="/profile/:id" element={<ProfileGeneral />} />
          <Route path="/report" element={<Report />} />
          <Route
            path="/EditAutomaticWorkflow"
            element={<EditAutomaticWorkflow />}
          />
          <Route path="/mfa/validate" element={<MFAValidationComponent />} />
          <Route path="/mfa/enable-mfa" element={<EnableMFAComponent />} />
          <Route
            path="/ticket"
            element={<Ticket />}
            socket={socket}
            user={user}
          />
          <Route
            path="/ticketEntity/:id"
            element={<TicketEntity />}
            socket={socket}
            user={user}
          />
          <Route
            path="/createTicket"
            element={<CreatTicketComponent />}
            socket={socket}
          />
          <Route path="/knowledgeBase" element={<KnowledgeBaseHomePage />} />
          <Route path="/EditCustomWorkflow" element={<EditCustomWorkflow />} />
          <Route
            path="/changeBrand"
            element={<ChangeBrandPage setCurrentTheme={setCurrentTheme} />}
          />
          <Route path="/chat" element={<ChatMain />} />
          <Route path="/lightChat" element={<LightChat />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
