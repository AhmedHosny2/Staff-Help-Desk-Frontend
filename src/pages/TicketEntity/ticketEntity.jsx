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
            process.env.REACT_APP_TICKETS_URL + "/" + id,
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
    <>
      {/* <p>Status: {data.status}</p>
            <p>Time Created: {data.timeCreated}</p> */}
      {data && (
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <QRCode value={window.location.href} />
          </figure>
          <div className="card-body">
            <h2 className="cardh2le">{data.title}</h2>
            <span className="badge badge-ghost badge-lg">
              {data.issue_type}
            </span>
            <span className="badge badge-ghost badge-sm">
              {data.sub_category}
            </span>
            <p>{data.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
