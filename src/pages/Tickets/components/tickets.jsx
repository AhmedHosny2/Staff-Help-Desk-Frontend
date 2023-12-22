import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../../utils/Fetch";
import { Toaster } from "react-hot-toast";
import React from "react";
import img from "../../../assets/account-avatar-profile.svg";
export default function TicketComponent() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setUserType(userRole.match("agent") ? userRole.slice(0, -1) : userRole);
    const fetchData = async () => {
      try {
        const { newData } = await customFetch(
          process.env.REACT_APP_TICKETS_URL + "/getAgentTickets",
          "GET"
        );
        setData(newData);

        console.log("new " + newData[0]);
        console.log("new " + newData[0].ticket._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleEmailClick = (e) => {
    window.location.href = `mailto:${e.target.value}`;
  };
  const handleIDClick = (e) => {
    navigate(`/ticketEntity/${e.target.value}`);
  };
  return (
    <>
      {/* <div className="badge bg-base-300">Pending</div>
      <div className="badge badge-accent ">Open</div>
      <div className="badge bg-neutral text-base-300">Closed</div>
      <Toaster /> */}
      {/*
      
      tickets for admin he can see all the tickets  ========================

        REQUESTER : PIC , NAME , EMAIL 
        SUBJECT : TITLE 
        AGENT : AGENT NAME 
        STATUS : STATUS



*/}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>REQUESTER</th>
              <th>SUBJECT</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>ID</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* we should iterate over the data here  */}
            {data &&
              data.map((ticketData) => (
                <tr key={ticketData.ticket._id}>
                  {/* user / resquester  for ( admin / manager / agent ) */}
                  {(userType === "manager" ||
                    userType === "admin" ||
                    userType === "agent") &&
                    ticketData.userData && (
                      <>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={
                                    ticketData.userData.profilePic
                                      ? ticketData.userData.profilePic
                                      : img
                                  }
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {ticketData.userData.firstName +
                                  " " +
                                  ticketData.userData.lastName}
                              </div>
                              <div
                                className="text-black-400 hover:underline"
                                onClick={handleEmailClick}
                              >
                                {ticketData.userData.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          {ticketData.ticket.title}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {ticketData.ticket.issue_type}
                          </span>
                        </td>
                        <td>
                          {ticketData.ticket.ticketPriority === "low" && (
                            <div className="badge bg-success">Low</div>
                          )}
                          {ticketData.ticket.ticketPriority === "medium" && (
                            <div className="badge badge-warning">Medium</div>
                          )}
                          {ticketData.ticket.ticketPriority === "high" && (
                            <div className="badge bg-error">High</div>
                          )}
                        </td>
                        <td>
                          {ticketData.ticket.status === "open" && (
                            <div className="badge bg-primary">open</div>
                          )}
                          {ticketData.ticket.status === "pending" && (
                            <div className="badge badge-ghost">pending</div>
                          )}
                          {ticketData.ticket.status === "updated" && (
                            <div className="badge bg-accent">updated</div>
                          )}
                        </td>
                      </>
                    )}

                  <th>
                    <button
                      className="btn btn-ghost btn-xs "
                      value={ticketData.ticket._id}
                      onClick={handleIDClick}
                    >
                      {ticketData.ticket._id}
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>REQUESTER</th>
              <th>SUBJECT</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>ID</th>

              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>{" "}
      <Toaster />
    </>
  );
}
