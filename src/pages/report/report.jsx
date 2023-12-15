import { useEffect, useState } from 'react';
import ReportComponent from './components/report';
import { customFetch } from '../../utils/Fetch';

export default function Report() {
	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { err, isPen, newData, newStatus, newStatusText, newMessage } = await customFetch(
					process.env.REACT_APP_TICKETS_URL + '/reports/performance',
					'POST'
				);
				await setData({
					...newData,
					mostFrequentIssueType: 'Software',
					averageSolveTimePerAgent: [
						{ id: 1, name: 'Johnny', averageSolveTime: 2 }, //DONE
						{ id: 2, name: 'Amanda', averageSolveTime: 7 }, //DONE
						{ id: 3, name: 'Joe', averageSolveTime: 9 }, //DONE
					],
				});
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [setData]);
	return (
		<>
			<ReportComponent data={data} />
		</>
	);
}
