import React, { useState, useEffect } from "react";
import { customFetch } from "../../../../utils/Fetch";
import { formatDate } from "../../../../utils/FormatDate";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TableLogs = () => {

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

    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        { id: "statuscode", label: "Status Code", minWidth: 120 },
        { id: "method", label: "Method", minWidth: 100 },
        { id: "api", label: "API", minWidth: 100 },
        { id: "time", label: "Time", minWidth: 100 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { newData, err } = await customFetch(
                `${process.env.REACT_APP_LOGGING_URL}?limit=10`,
                "GET"
            );
            if (!err) {
                setRowsData(newData);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <motion.div variants={heroVariant} initial="hidden" animate="visible">
                <div className="flex justify-center items-center min-h-screen">
                    {isLoading ? (
                        <p>Loading data...</p>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <div className="flex flex-col items-center my-8">
                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">LOGS</span>
                                        <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                                            Recent Logs
                                        </h2>
                                    </div>
                                    <Link to="/logs" className="link link-hover text-sm">
                                        View Full Logs Details?
                                    </Link>
                                </div>
                                <div className="overflow-x-auto border rounded shadow-md mb-4">
                                    <table >
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                {columns.map((column) => (
                                                    <th key={column.id} className={`px-6 py-4 min-w-[${column.minWidth}]`}>
                                                        {column.label}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rowsData.map((row) => (
                                                <tr key={row.id} className="hover:bg-gray-200 dark:hover:bg-gray-800">
                                                    {Object.entries(row).map(([key, value]) => (
                                                        <td key={key} className="px-6 py-4">
                                                            {key === "time"
                                                                ? formatDate(value, 1)
                                                                : key === "date"
                                                                    ? formatDate(value)
                                                                    : value}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default TableLogs;
