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
            process.env.REACT_APP_TICKETS_URL + "/getAgentTickets",
            "GET"
          );
        await setData(newData);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleEmailClick = (e) => {
    window.location.href = `mailto:${e.target.value}`;
  };
  return (
    <>
      {/* <div className="badge bg-base-300">Pending</div>
      <div className="badge badge-accent ">Open</div>
      <div className="badge bg-neutral text-base-300">Closed</div>
      <Toaster /> */}
      {/*
      
      tickets for agent ========================

        REQUESTER : PIC , NAME , EMAIL 
        SUBJECT : TITLE 
        AGENT : AGENT NAME 
        STATUS : STATUS



*/}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>REQUESTER</th>
              <th>SUBJECT</th>
              <th>AGENT</th>
              <th>STATUS</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* we should iterate over the data here  */}
            {data &&
              data.map((ticketData) => (
                <tr key={ticketData.userData._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-2@56w.png"
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
                          className="text-blue-500 hover:underline"
                          onClick={handleEmailClick}
                        >
                          {" "}
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
                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}

            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-5@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Yancy Tear</div>
                    <div className="text-sm opacity-50">Brazil</div>
                  </div>
                </div>
              </td>
              <td>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">
                  Community Outreach Specialist
                </span>
              </td>
              <td>Indigo</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
