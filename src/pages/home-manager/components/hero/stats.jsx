import React, { useState, useEffect } from 'react';
import { customFetch } from '../../../../utils/Fetch';
import { motion } from 'framer-motion';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StatsCard = () => {

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

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
                    process.env.REACT_APP_TICKETS_URL + '/reports/performance',
                    'POST'
                );
                setData(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setData]);
    return (
        <>
            <motion.div variants={heroVariant} initial="hidden" animate="visible" className="flex justify-center w-full">
                <div className="stats shadow m-16 mx-24">
                    <Stat data={{
                        icon: (
                            <ConfirmationNumberOutlinedIcon />
                        ),
                        title: 'All Time Tickets',
                        value: data !== null ? data.numberOfTickets : "Loading..."
                    }} />
                    <Stat data={{
                        icon: (
                            <StarOutlineIcon />
                        ),
                        title: 'Average Rating',
                        value: data !== null ? data.averageRating : "Loading..."
                    }} />
                    <Stat data={{
                        icon: (
                            <SupportAgentIcon />
                        ),
                        title: 'Number of Agents',
                        value: data !== null ? data.agents.data.length : "Loading..."
                    }} />
                </div>
            </motion.div>
        </>
    );
};

const Stat = ({ data }) => {
    const { icon, title, value } = data;
    return (
        <div className="stat">
            <div className="stat-figure text-secondary">{icon}</div>
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
        </div>
    );
};

export default StatsCard;
