import { useEffect, useState } from "react";
import TestTicketComponent from "./components/testTicket";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../../utils/Fetch";
import img from "../../assets/account-avatar-profile.svg";

export default function TestestTicket() {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/")[2];
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [editorRunning, setEditorRunning] = useState(false);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("role")) navigate("/");
        setUserType(localStorage.getItem("role"));
        const { err, isPen, newData, newStatus, newStatusText, newMessage } =
          await customFetch(
            process.env.REACT_APP_TICKETS_URL + "/" + id,
            "GET"
          );
		  //remove last char 
      const userRole = localStorage.getItem("role")
				newData.userType =userRole.match("agent")? userRole.slice(0, -1):userRole;
				if(!newData.profilePic)
				newData.profilePic = img;
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <>{data && <TestTicketComponent data={data} />}</>;
}

// const data = {
// 	image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
// 	issue: 'Internet Connection Issue',
// 	category: 'servers',
// 	description: 'The server in our office is down, and we cant access critical files',
// 	firstName: 'Ahmed',
// 	lastName: 'Yehia',
// 	profilePicture: 'https://tailwindcss.com/img/erin-lindford.jpg',
// };
