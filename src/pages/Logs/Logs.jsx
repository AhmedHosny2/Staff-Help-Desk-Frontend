import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import ReplayIcon from '@mui/icons-material/Replay';
import { formatDate } from '../../utils/FormatDate';
import { customFetch } from "../../utils/Fetch";

const columns = [
    { id: 'statuscode', label: 'Status Code', minWidth: 120 },
    { id: 'method', label: 'Method', minWidth: 100 },
    { id: 'api', label: 'API', minWidth: 100 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'userId', label: 'UserId', minWidth: 100 },
    { id: 'ipaddress', label: 'IP Address', minWidth: 120 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'country', label: 'Country', minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
];

function Logs() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("basic-logs");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsData, setRowsData] = useState([]);
    const rows = [];

    function createData(id, statuscode, method, api, details, userId, ipaddress, date, time, country, city) {
        return { id, statuscode, method, api, details, userId, ipaddress, date, time, country, city };
    }

    for (let i = 0; i < rowsData.length; i++) {
        const { statuscode, method, api, details, userId, ipaddress, time, country, city } = rowsData[i];
        const dataObject = createData(i + 1, statuscode, method, api, details, userId, ipaddress, formatDate(time), formatDate(time, 1),
            country, city);
        rows.push(dataObject);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getBasicLogs = async (event) => {
        if (event) {
            event.preventDefault();
        }
        setRowsData([]);
        setActiveTab('basic-logs')
        setLoading(true);
        const { err, isPen, newData, newStatus } = await customFetch(
            `${process.env.REACT_APP_LOGGING_URL}/logging`,
            "GET"
        );
        setLoading(false);
        if (err) {

        }
        setRowsData(newData);
    }

    const getAdvancedLogs = async (event) => {
        event.preventDefault();
        setRowsData([]);
        setActiveTab('advanced-logs')
        setLoading(true);
        const { err, isPen, newData, newStatus } = await customFetch(
            `${process.env.REACT_APP_LOGGING_URL}/logging/advanced`,
            "GET"
        );
        setLoading(false);
        if (err) {

        }
        setRowsData(newData);
    }

    const replay = (event) => {
        event.preventDefault();
        if (activeTab === 'basic-logs') {
            getBasicLogs(event);
        } else {
            getAdvancedLogs(event);
        }
    };


    useEffect(() => {
        getBasicLogs();
    }, []);

    return (
        <>
            {loading && (
                <div className="bg-secondry">
                    <LinearProgress color="inherit" />
                </div>
            )}
            <div
                className="flex flex-col justify-center items-center"
                style={{ width: '90%', margin: '0 auto' }}
            >
                <h1 class="mt-20 text-3xl font-bold leading-tight text-secondary-focus mb-6">
                    Logs
                </h1>
                <Paper
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: 'var(--trans-Footer-Color)',
                    }}
                >
                    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex text-sm font-medium text-center" id="myTab" role="tablist">
                            <li className="flex-grow mr-2" role="presentation">
                                <button
                                    className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'basic-logs' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                    id="basic-logs-tab"
                                    type="button"
                                    role="tab"
                                    aria-controls="basic-logs"
                                    aria-selected={activeTab === 'basic-logs'}
                                    onClick={(e) => getBasicLogs(e)}
                                >
                                    Basic Logs
                                </button>
                            </li>
                            <li className="flex-grow mr-2" role="presentation">
                                <button
                                    className={`w-full inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'advanced-logs' ? 'border-gray-800 dark:border-gray-300' : 'border-transparent'}`}
                                    id="advanced-logs-tab"
                                    type="button"
                                    role="tab"
                                    aria-controls="advanced-logs"
                                    aria-selected={activeTab === 'advanced-logs'}
                                    onClick={(e) => getAdvancedLogs(e)}
                                >
                                    Advanced Logs
                                </button>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        (activeTab === 'advanced-logs' || (column.id !== 'country' && column.id !== 'city'
                                            && column.id !== 'details' && column.id !== 'userId' && column.id !== 'ipaddress')) && (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    backgroundColor: 'var(--your-non-transparent-color)',
                                                    fontWeight: 'bold',
                                                    padding: 0
                                                }}
                                            >
                                                <div className='bg-base-100 font-bold p-4'>
                                                    {column.label}
                                                </div>
                                            </TableCell>
                                        )
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                                style={{
                                                    backgroundColor: 'var(--trans-Table-Color)',
                                                }}
                                            >
                                                {columns.map((column) => (
                                                    // Check if the column id is 'country' or 'city'
                                                    (activeTab === 'advanced-logs' || (column.id !== 'country' && column.id !== 'city'
                                                        && column.id !== 'details' && column.id !== 'userId' && column.id !== 'ipaddress')) && (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ color: 'var(--trans-Text-Color)' }}
                                                        >
                                                            {column.format && typeof row[column.id] === 'number'
                                                                ? column.format(row[column.id])
                                                                : row[column.id]}
                                                        </TableCell>
                                                    )
                                                ))}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="flex justify-between items-center">
                        <button className="bg-base-100 px-4 py-2 rounded focus:outline-none"
                            type="button"
                            onClick={(e) => replay(e)}>
                            <ReplayIcon />
                        </button>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                color: 'var(--trans-Footer-Text-Color)',
                            }}
                            labelRowsPerPage="Rows:"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} rows`}
                            nextIconButtonText="Next Page"
                            backIconButtonText="Previous Page"
                        />
                    </div>

                </Paper >
            </div >
        </>
    );
}
export default Logs;