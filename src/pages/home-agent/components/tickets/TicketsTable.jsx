import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customFetch } from "../../../../utils/Fetch";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function TicketComponent() {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const heroVariant = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 3, duration: 1, ease: 'easeInOut', when: 'beforeChildren' },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const {
                    err,
                    isPen,
                    newData,
                    newStatus,
                    newStatusText,
                    newMessage,
                } = await customFetch(
                    process.env.REACT_APP_TICKETS_URL + "/getAgentTickets",
                    "GET"
                );
                setData(newData);
                console.log(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleIDClick = (ticketId) => {
        navigate(`/ticketEntity/${ticketId}`);
    };

    const filteredData = data?.filter(
        (ticketData) => ticketData.ticket.status === "open"
    );

    return (
        <>
            <motion.div variants={heroVariant} initial="hidden" animate="visible">
                <div className="flex justify-center items-center m-4">
                    <div className="w-full max-w-screen-lg mx-auto">
                        <div className="flex flex-col items-center my-8">
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">
                                    TICKETS
                                </span>
                                <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                                    Open Tickets
                                </h2>
                            </div>
                            <Link to="/ticket" className="link link-hover text-sm">
                                View All Tickets?
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table min-w-full table-auto">
                                <thead>
                                    <tr>
                                        <th>REQUESTER</th>
                                        <th>SUBJECT</th>
                                        <th>PRIORITY</th>
                                        <th>ID</th>
                                        <th>STATUS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6">Loading data...</td>
                                        </tr>
                                    ) : filteredData && filteredData.length > 0 ? (
                                        filteredData.map((ticketData) => (
                                            <tr key={ticketData.userData._id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img
                                                                    src={ticketData.userData.profilePic}
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
                                                                onClick={() =>
                                                                    handleEmailClick(ticketData.userData.email)
                                                                }
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
                                                <th>
                                                    <button
                                                        className="btn btn-ghost btn-xs"
                                                        value={ticketData.ticket._id}
                                                        onClick={() =>
                                                            handleIDClick(ticketData.ticket._id)
                                                        }
                                                    >
                                                        {ticketData.ticket._id}
                                                    </button>
                                                </th>
                                                <td>{ticketData.ticket.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No open tickets found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Toaster />
            </motion.div>
        </>
    );
}
