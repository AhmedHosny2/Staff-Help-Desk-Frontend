import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../utils/Fetch";
import { Trash } from "react-bootstrap-icons";
import { PencilSquare } from "react-bootstrap-icons";
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

  //   useEffect(() => {
  //     if(data === )navigate("/tickets");
  //   }, [data]);

  const handleButtonClick = (e) => {
    const fetchData = async () => {
      try {
        const { err, isPen, newData, newStatus, newStatusText, newMessage } =
          await customFetch(
            process.env.REACT_APP_TICKETS_URL + "/" + id,
            "DELETE"
          );
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    navigate("/ticket");
  };

  return (
    <>
      {/* <p>Status: {data.status}</p>
            <p>Time Created: {data.timeCreated}</p> */}
      {data && (
        <div className="flex justify-center items-center">
          <div className="card w-96 bg-base-100 shadow-xl flex items-center p-10">
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
              <i class="bi bi-trash"></i>
              <p>{data.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-error" onClick={handleButtonClick}>
                  <Trash size={35} style={{ marginRight: "5px" }} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
