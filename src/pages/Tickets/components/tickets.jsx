import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { customFetch } from "../../../utils/Fetch";
import { Toaster } from "react-hot-toast";
import React from "react";
import img from "../../../assets/account-avatar-profile.svg";
export default function TicketComponent({ data }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const userRole = localStorage.getItem("role");
 useEffect(() => {
	setUserType(userRole.match("agent") ? userRole.slice(0, -1) : userRole);
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

      
      tickets for admin he can see all the tickets  ========================

        REQUESTER : PIC , NAME , EMAIL 
        SUBJECT : TITLE 
        AGENT : AGENT NAME 
        STATUS : STATUS



*/}
      <div className="overflow-x-auto mt-10">
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
            {data ? (
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
              ))
            ) : (
              <>
                {[1, 2, 3, 4].map((index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="w-3/12">
                        <div className="flex items-center gap-3">
                          <div className="skeleton w-14 h-14 rounded-full shrink-0"></div>
                          <div className="flex flex-col gap-1 w-6/12">
                            <div className="skeleton h-4 w-7/12"></div>
                            <div className="skeleton h-4 w-10/12"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-1 w-6/12">
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-5/12"></div>
                        </div>
                      </td>
                      <td>
                        <div className="skeleton h-4 w-3/12"></div>
                      </td>
                      <td>
                        <div className="skeleton h-4 w-3/12"></div>
                      </td>
                      <td>
                        <div className="skeleton h-2 w-full"></div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </>
            )}
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
      </div>
      <Toaster />
    </>
  );
}
