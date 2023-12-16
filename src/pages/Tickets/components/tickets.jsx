import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../../utils/Fetch";
import { getToastStyle, removeToast } from "../../../utils/toastStyle";
import toast, { Toaster } from "react-hot-toast";

export default function TicketComponent({ setLoggedin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("youfielwy@gmail.com");
  const [password, setPassword] = useState("Stecki10");
  const [loggingin, setLoggingin] = useState(false);

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
            process.env.REACT_APP_TICKETS_URL + "/getUserTickets",
            "GET"
          );
        await setData(newData);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setData]);

  return (
    <>
      <div className="badge bg-base-300">Pending</div>
      <div className="badge badge-accent ">Open</div>
      <div className="badge bg-neutral text-base-300">Closed</div>
      <Toaster />
    </>
  );
}
