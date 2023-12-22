import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

export default function UserTicket({ data }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleButtonClick = (ticketId) => {
    navigate(`/ticketEntity/${ticketId}`);
  };
  if(!data) return null;
  const filteredData = data.filter((ticketData) =>
    ticketData.issue_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by issue type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      {filteredData.map((ticketData) => (
        <div
          key={ticketData._id}
          className="card w-96 bg-base-100 shadow-xl mb-4"
          onClick={() => handleButtonClick(ticketData._id)}
        >
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
              <div className="badge badge-outline">{ticketData.issue_type}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
