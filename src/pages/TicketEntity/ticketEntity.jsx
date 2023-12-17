import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../utils/Fetch";

export default function TicketEntity() {
  const navigate = useNavigate();
    const id = window.location.pathname.split("/")[2];
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [message, setMessage] = useState("");

  // put this in use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { err, isPen, newData, newStatus, newStatusText, newMessage } =
          await customFetch(
            process.env.REACT_APP_TICKETS_URL +"/"+ id,
            "GET"
          );
         setData(newData);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
   console.log(data);
  }, [data]);

  const handleIDClick = (e) => {
    navigate(`/ticket/${e.target.value}`);
  };

    return (
        <div>
        <h1>Ticket Details</h1>
        <div>
          <p>Title: {data.title}</p>
          <p>Description: {data.description}</p>
          <p>Issue Type: {data.issue_type}</p>
          <p>Sub Category: {data.sub_category}</p>
          <p>Status: {data.status}</p>
          <p>Priority: {data.ticketPriority}</p>
          {/* Add more details as needed */}
          <p>Time Created: {data.timeCreated}</p>
        </div>
        <div>
          <h2>QR Code</h2>
        <QRCode value={window.location.href} />
      </div>
      </div>
      
    );
}
