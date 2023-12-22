import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getTailwindColorHex } from '../../../utils/getTailwindColorHex';

const primaryColor = getTailwindColorHex('text-primary');
const secondaryColor = getTailwindColorHex('text-secondary');
const accentColor = getTailwindColorHex('text-accent');
const base100 = getTailwindColorHex('text-base-100');
const primaryContentColor = getTailwindColorHex('text-primary-content');
const neutralColor = getTailwindColorHex('text-neutral');
const neutralContentColor = getTailwindColorHex('text-neutral-content');

const addSection = (pdf, yPosition, title, content) => {
	pdf.setFontSize(14);
	pdf.setFont(undefined, 'bold');
	pdf.text(0.5, yPosition, title);
	pdf.setFont(undefined, 'normal');
	pdf.text(3.5, yPosition, content.toString());
};

const addSection2 = (pdf, yPosition, title, countTitle, agent) => {
	console.log('START OF AGENT');
	console.log(agent);
	pdf.setFontSize(14);
	pdf.setFont(undefined, 'bold');
	pdf.text(0.5, yPosition, title);
	pdf.setFont(undefined, 'normal');
	const { agentId, agentName, role, openedTickets } = agent;
	pdf.text(0.8, yPosition + 0.3, 'Agent ID: ' + agentId.toString());
	pdf.text(0.8, yPosition + 0.6, 'Agent Name: ' + agentName.toString());
	pdf.text(0.8, yPosition + 0.9, 'Agent Role: ' + role.toString());
	pdf.text(0.8, yPosition + 1.2, countTitle + openedTickets.toString());
};

const addTable = (pdf, yPosition, tableData) => {
	pdf.setFontSize(14);
	pdf.autoTable({
		theme: 'plain',
		startY: yPosition,
		head: [['ID', 'Name', 'Role', 'Priority']],
		body: tableData.map((agent) => [
			agent._id,
			`${agent.firstName} ${agent.lastName}`,
			agent.role,
			// agent.priorityMode,
			'medium',
		]),
	});
};

const generatePDF = (chartIds, chartTitles, data, tableData) => {
	const pdf = new jsPDF({
		unit: 'in',
		format: [8.5, 11], // Letter size [x, y]
	});

	pdf.setFontSize(18);
	const textX = 8.5 / 2;
	const textY = 1;
	pdf.text("This Month's Report - Agent Performance", textX, textY, { align: 'center' });

	addTable(pdf, 2, tableData);

	addSection(pdf, 4, 'Number of Tickets:', data.numberOfTickets);
	addSection(pdf, 4.5, 'Average Rating:', data.averageRating + ' stars');
	// addSection(pdf, 5, 'Most Frequent Issue Type:', data.mostFrequentIssueType + ' issues');
	addSection(pdf, 5, 'Most Frequent Issue Type:', 'Software', ' issues');
	addSection2(
		pdf,
		5.5,
		'Agent With Most Open Tickets:-',
		'Number of open tickets: ',
		data.agentWithMostOpenedTickets
	);
	addSection2(
		pdf,
		7.2,
		'Agent With Most Closed Tickets:-',
		'Number of closed tickets: ',
		data.agentWithMostSolvedTickets
	);

	pdf.addPage(); // Add a new page for charts

	chartIds.forEach((chartId, index) => {
		const chart = document.getElementById(chartId);

		if (chart) {
			const aspectRatio = chart.width / chart.height;
			const pdfWidth = 8.5;
			const pdfHeight = pdfWidth / aspectRatio;

			const canvas = document.createElement('canvas');
			canvas.width = pdfWidth * 96;
			canvas.height = pdfHeight * 96;

			const ctx = canvas.getContext('2d');

			// Set canvas background color to white
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.scale(2, 2);
			ctx.drawImage(chart, 0, 0, canvas.width / 2, canvas.height / 2);

			const xPosition = 1.3;
			let yPosition = 2;
			if (index !== 0) {
				yPosition = 2 + (index - 1) * 5;
			}

			pdf.text(chartTitles[index], xPosition + 3, yPosition - 0.2, { align: 'center' });
			pdf.addImage(
				canvas.toDataURL('image/jpeg'),
				'JPEG',
				xPosition,
				yPosition,
				(canvas.width / 96) * 0.7,
				(canvas.height / 96) * 0.7
			);
		}
		if (index === 0) {
			pdf.addPage();
		}
	});

	pdf.save('report.pdf');
};

const Charts1 = ({ data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Initialize and render your charts using Chart.js

		const ctx = chartRef.current.getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: data.agentsStats.map((agent) => agent.agentName),
				datasets: [
					{
						label: 'Number of Solved Tickets',
						data: data.agentsStats.map((agent) => agent.solvedTickets),
						borderColor: neutralContentColor,
						backgroundColor: [primaryColor, secondaryColor, accentColor],
						hoverOffset: 4,
					},
				],
			},
		});

		const handleResize = () => {
			myChart.resize(); // This resizes the chart
		};

		window.addEventListener('resize', handleResize);

		// Cleanup: Destroy the chart when the component unmounts
		return () => {
			myChart.destroy();
			window.removeEventListener('resize', handleResize);
		};
	}, [
		data.agentsStats,
		data.averageRatingPerAgent,
		data.numberOfSolvedTicketsAgent1,
		data.numberOfSolvedTicketsAgent2,
		data.numberOfSolvedTicketsAgent3,
	]);

	return <canvas id="myChart1" ref={chartRef} style={{ width: '100%' }}></canvas>;
};

const Charts2 = ({ data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Initialize and render your charts using Chart.js
		const ctx = chartRef.current.getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'bar', // Change the chart type to 'bar' for the bar chart
			data: {
				labels: data.agentsStats.map((agent) => agent.agentName),
				datasets: [
					{
						label: 'Average Rating Per Agent',
						data: data.agentsStats.map((agent) => agent.avgRating),
						borderColor: neutralContentColor,
						backgroundColor: [primaryColor, secondaryColor, accentColor],
						borderWidth: 1,
					},
				],
			},
		});

		// Handle chart resize on window resize
		const handleResize = () => {
			myChart.resize(); // This resizes the chart
		};

		window.addEventListener('resize', handleResize);

		// Cleanup: Destroy the chart and remove the event listener when the component unmounts
		return () => {
			myChart.destroy();
			window.removeEventListener('resize', handleResize);
		};
	}, [data.agentsStats, data.averageRatingPerAgent]);

	return <canvas id="myChart2" ref={chartRef}></canvas>;
};

const Charts3 = ({ data }) => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Initialize and render your charts using Chart.js
		const ctx = chartRef.current.getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'bar', // Change the chart type to 'bar' for the bar chart
			data: {
				axis: 'y',
				labels: data.averageSolveTimePerAgent.map((agent) => agent.name),
				datasets: [
					{
						label: 'Average Solve Time Per Agent',
						data: data.averageSolveTimePerAgent.map((agent) => agent.averageSolveTime),
						borderColor: neutralContentColor,
						backgroundColor: [primaryColor, secondaryColor, accentColor],
						borderWidth: 1,
					},
				],
			},
			options: {
				indexAxis: 'y',
			},
		});

		// Handle chart resize on window resize
		const handleResize = () => {
			myChart.resize(); // This resizes the chart
		};

		window.addEventListener('resize', handleResize);

		// Cleanup: Destroy the chart and remove the event listener when the component unmounts
		return () => {
			myChart.destroy();
			window.removeEventListener('resize', handleResize);
		};
	}, [data.averageSolveTimePerAgent]);

	return <canvas id="myChart3" ref={chartRef}></canvas>;
};

export { Charts1, Charts2, Charts3, generatePDF };
