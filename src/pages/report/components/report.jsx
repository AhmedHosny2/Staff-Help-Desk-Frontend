import { Charts1, Charts2, Charts3, generatePDF } from './chartComponent';
import Info from './infoComponent';
import { mockData } from './mockData';

export default function ReportComponent() {
	const exportPDF = () => {
		const chartIds = ['myChart1', 'myChart2', 'myChart3'];
		const chartTitles = [
			'Number Of Solved Tickets Per Agent',
			'Average Rating Per Agent',
			'Average Solve Time Per Agent',
		];
		const tableData = mockData.agents;

		generatePDF(chartIds, chartTitles, mockData, tableData);
	};
	return (
		<>
			<div className="pdf-wrapper shadow-lg border border-black p-8 w-full md:w-3/4 lg:w-7/12 xl:w-9/12 mx-auto my-16">
				<h2 className="text-center text-3xl font-bold mt-16">
					This Month's Report - Agent Performance
				</h2>
				<div className="divider mt-0 my-16"></div>
				<Info data={mockData} />

				<div className="flex flex-col items-center space-y-4">
					<h2 className="mt-16 text-xl font-bold">Number Of Solved Tickets</h2>
					<div className="w-full md:w-1/2 lg:w-1/4">
						<Charts1 data={mockData} />
					</div>
					<h2 className="mt-16 text-xl font-bold">Average Rating Per Agent</h2>
					<div className="w-full md:w-3/4 lg:w-1/2">
						<Charts2 data={mockData} />
					</div>
					<h2 className="mt-16 text-xl font-bold">Average Solve Time Per Agent</h2>
					<div className="w-full md:w-3/4 lg:w-1/2">
						<Charts3 data={mockData} />
					</div>
				</div>

				<button onClick={() => exportPDF()}>
					<a className="link link-hover">Export To PDF</a>
				</button>
			</div>
		</>
	);
}
