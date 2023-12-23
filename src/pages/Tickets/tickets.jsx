import TicketComponent from "./components/tickets";
import { useEffect, useState } from "react";
import { customFetch } from "../../utils/Fetch";
import UserTicket from "./components/userTicket";

export default function Ticket() {
  const [data, setData] = useState(null);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setUserType(userRole.match("agent") ? userRole.slice(0, -1) : userRole);
    const fetchData = async (url) => {
      try {
        const { newData } = await customFetch(
          process.env.REACT_APP_TICKETS_URL + url,
          "GET"
        );
        newData.userType=userType
        setData(newData);
        console.log("new " + newData[0].userData.email);
        console.log("new " + newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userRole !== "user") fetchData("/getAgentTickets");
    else fetchData("/getUserTickets");
  }, []);
  return (
    <>
      {userType !== "user" && <TicketComponent data={data} />}
      {userType === "user" && <UserTicket data={data} />}
    </>
  );
}
