import { Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

export default function UserTicket({ data }) {
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    navigate(`/ticketEntity/${e.currentTarget.dataset.ticketId}`);
  };
  return (
    <>
      {data &&
        data.map((ticketData) => (
          <div
            key={ticketData._id}
            className="card w-96 bg-base-100 shadow-xl"
            onClick={handleButtonClick}
            data-ticket-id={ticketData._id}
          >
            {" "}
            <figure>
              <QRCode value={window.location.href} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {ticketData.title}
                <div className="badge badge-secondary">{ticketData.status}</div>
              </h2>
              <p>{ticketData.description}</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">
                  {ticketData.issue_type}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
