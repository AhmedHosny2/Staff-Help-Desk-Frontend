const agents = [
	{ id: 1, name: 'Johnny', role: 'agent1' },
	{ id: 2, name: 'Amanda', role: 'agent1' },
	{ id: 3, name: 'Joe', role: 'agent3' },
];

const tickets = [
	{
		id: 1,
		agentId: 1,
		createdUser: 'user1',
		issue_type: 'Software',
		sub_category: 'operating system',
		description: 'Issue with Windows installation',
		title: 'Windows Error',
		status: 'closed',
		rating: 4,
		timeCreated: new Date('2023-01-01T08:00:00Z'),
		timeSolved: new Date('2023-01-02T10:30:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Reinstalled Windows', 'Applied updates'],
	},
	{
		id: 2,
		agentId: 2,
		createdUser: 'user2',
		issue_type: 'Hardware',
		sub_category: 'laptops',
		description: 'Laptop not powering on',
		title: 'Power Issue',
		status: 'closed',
		rating: 5,
		timeCreated: new Date('2023-01-02T09:30:00Z'),
		timeSolved: new Date('2023-01-03T11:45:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Checked power supply', 'Replaced faulty battery'],
	},
	{
		id: 3,
		agentId: 3,
		createdUser: 'user3',
		issue_type: 'Network',
		sub_category: 'internet connection problems',
		description: 'Unable to connect to the internet',
		title: 'Internet Connectivity Issue',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-03T11:00:00Z'),
		timeSolved: null,
		ticketPriority: 'high',
		ticketSolution: [],
	},
	{
		id: 4,
		agentId: 1,
		createdUser: 'user4',
		issue_type: 'Hardware',
		sub_category: 'desktops',
		description: 'Desktop not booting up',
		title: 'Desktop Boot Issue',
		status: 'closed',
		rating: 3,
		timeCreated: new Date('2023-01-04T08:45:00Z'),
		timeSolved: new Date('2023-01-05T10:15:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Checked power supply', 'Repaired OS installation'],
	},
	{
		id: 5,
		agentId: 2,
		createdUser: 'user5',
		issue_type: 'Software',
		sub_category: 'application software',
		description: 'Application crashing on startup',
		title: 'Application Crash',
		status: 'closed',
		rating: 2,
		timeCreated: new Date('2023-01-05T09:15:00Z'),
		timeSolved: new Date('2023-01-06T12:30:00Z'),
		ticketPriority: 'low',
		ticketSolution: ['Reinstalled application', 'Applied patches'],
	},
	{
		id: 6,
		agentId: 3,
		createdUser: 'user6',
		issue_type: 'Network',
		sub_category: 'website errors',
		description: 'Error accessing the company website',
		title: 'Website Access Issue',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-06T10:30:00Z'),
		timeSolved: null,
		ticketPriority: 'medium',
		ticketSolution: [],
	},
	{
		id: 7,
		agentId: 1,
		createdUser: 'user7',
		issue_type: 'Hardware',
		sub_category: 'printers',
		description: 'Printer not printing properly',
		title: 'Printer Issue',
		status: 'closed',
		rating: 5,
		timeCreated: new Date('2023-01-07T08:30:00Z'),
		timeSolved: new Date('2023-01-08T11:00:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Checked printer settings', 'Replaced toner cartridge'],
	},
	{
		id: 8,
		agentId: 2,
		createdUser: 'user8',
		issue_type: 'Software',
		sub_category: 'custom software',
		description: 'Custom software not working as expected',
		title: 'Custom Software Issue',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-08T09:45:00Z'),
		timeSolved: null,
		ticketPriority: 'low',
		ticketSolution: [],
	},
	{
		id: 9,
		agentId: 3,
		createdUser: 'user9',
		issue_type: 'Network',
		sub_category: 'email issues',
		description: 'Unable to send/receive emails',
		title: 'Email Connectivity Issue',
		status: 'closed',
		rating: 4,
		timeCreated: new Date('2023-01-09T10:00:00Z'),
		timeSolved: new Date('2023-01-10T12:45:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Checked email settings', 'Reconfigured email client'],
	},
	{
		id: 10,
		agentId: 1,
		createdUser: 'user10',
		issue_type: 'Hardware',
		sub_category: 'servers',
		description: 'Server performance degradation',
		title: 'Server Performance Issue',
		status: 'closed',
		rating: 3,
		timeCreated: new Date('2023-01-10T11:30:00Z'),
		timeSolved: new Date('2023-01-11T09:15:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Optimized server settings', 'Applied performance updates'],
	},
	{
		id: 11,
		agentId: 2,
		createdUser: 'user11',
		issue_type: 'Software',
		sub_category: 'integration issues',
		description: 'Integration issue with third-party software',
		title: 'Integration Problem',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-11T10:45:00Z'),
		timeSolved: null,
		ticketPriority: 'medium',
		ticketSolution: [],
	},
	{
		id: 12,
		agentId: 3,
		createdUser: 'user12',
		issue_type: 'Hardware',
		sub_category: 'networking equipment',
		description: 'Networking equipment failure',
		title: 'Network Equipment Issue',
		status: 'closed',
		rating: 2,
		timeCreated: new Date('2023-01-12T08:15:00Z'),
		timeSolved: new Date('2023-01-13T10:30:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Replaced faulty switch', 'Checked network cables'],
	},
	{
		id: 13,
		agentId: 1,
		createdUser: 'user13',
		issue_type: 'Hardware',
		sub_category: 'laptops',
		description: 'Laptop running slow',
		title: 'Slow Laptop Issue',
		status: 'closed',
		rating: 4,
		timeCreated: new Date('2023-01-13T09:30:00Z'),
		timeSolved: new Date('2023-01-14T11:45:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Performed disk cleanup', 'Optimized startup programs'],
	},
	{
		id: 14,
		agentId: 2,
		createdUser: 'user14',
		issue_type: 'Software',
		sub_category: 'application software',
		description: 'Application freezing randomly',
		title: 'Application Freeze Issue',
		status: 'closed',
		rating: 5,
		timeCreated: new Date('2023-01-14T10:00:00Z'),
		timeSolved: new Date('2023-01-15T12:45:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Applied software update', 'Optimized system resources'],
	},
	{
		id: 15,
		agentId: 3,
		createdUser: 'user15',
		issue_type: 'Network',
		sub_category: 'internet connection problems',
		description: 'Intermittent internet connectivity issues',
		title: 'Intermittent Connectivity Issue',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-15T11:30:00Z'),
		timeSolved: null,
		ticketPriority: 'medium',
		ticketSolution: [],
	},
	{
		id: 16,
		agentId: 1,
		createdUser: 'user16',
		issue_type: 'Hardware',
		sub_category: 'printers',
		description: 'Printer not detected on the network',
		title: 'Printer Connectivity Issue',
		status: 'closed',
		rating: 3,
		timeCreated: new Date('2023-01-16T08:45:00Z'),
		timeSolved: new Date('2023-01-17T10:15:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Checked printer network settings', 'Reconfigured network connection'],
	},
	{
		id: 17,
		agentId: 2,
		createdUser: 'user17',
		issue_type: 'Software',
		sub_category: 'custom software',
		description: 'Custom software crashing on startup',
		title: 'Custom Software Crash Issue',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-17T09:15:00Z'),
		timeSolved: null,
		ticketPriority: 'low',
		ticketSolution: [],
	},
	{
		id: 18,
		agentId: 3,
		createdUser: 'user18',
		issue_type: 'Network',
		sub_category: 'email issues',
		description: 'Emails not syncing on mobile devices',
		title: 'Mobile Email Sync Issue',
		status: 'closed',
		rating: 4,
		timeCreated: new Date('2023-01-18T10:00:00Z'),
		timeSolved: new Date('2023-01-19T12:45:00Z'),
		ticketPriority: 'medium',
		ticketSolution: ['Checked email settings', 'Reconfigured mobile devices'],
	},
	{
		id: 19,
		agentId: 1,
		createdUser: 'user19',
		issue_type: 'Hardware',
		sub_category: 'servers',
		description: 'Server not responding to requests',
		title: 'Server Unresponsiveness Issue',
		status: 'closed',
		rating: 5,
		timeCreated: new Date('2023-01-19T11:30:00Z'),
		timeSolved: new Date('2023-01-20T09:15:00Z'),
		ticketPriority: 'high',
		ticketSolution: ['Restarted server', 'Checked server logs'],
	},
	{
		id: 20,
		agentId: 2,
		createdUser: 'user20',
		issue_type: 'Software',
		sub_category: 'integration issues',
		description: 'Integration issue with external API',
		title: 'API Integration Problem',
		status: 'open',
		rating: null,
		timeCreated: new Date('2023-01-20T10:45:00Z'),
		timeSolved: null,
		ticketPriority: 'medium',
		ticketSolution: [],
	},
];

const mockData2 = {
	numberOfTickets: 200,

	averageRating: 4.2,

	agentWithMostTickets: { id: 1, name: 'Johnny', ticketCount: 8 },

	agentWithMostOpenTickets: { id: 2, name: 'Amanda', openTicketCount: 5 },

	agentWithMostSolvedTickets: { id: 3, name: 'Joe', solvedTicketCount: 7 },

	mostFrequentIssueType: 'Software',

	numberOfSolvedTicketsAgent1: 100,

	numberOfSolvedTicketsAgent2: 70,

	numberOfSolvedTicketsAgent3: 30,

	averageRatingPerAgent: [
		{ id: 1, name: 'Johnny', averageRating: 4.5 },
		{ id: 2, name: 'Amanda', averageRating: 3.8 },
		{ id: 3, name: 'Joe', averageRating: 4.0 },
	],

	priorityModePerAgent: [
		{ id: 1, name: 'Johnny', priorityMode: 'medium' },
		{ id: 2, name: 'Amanda', priorityMode: 'high' },
		{ id: 3, name: 'Joe', priorityMode: 'low' },
	],

	averageSolveTimePerAgent: [
		{ id: 1, name: 'Johnny', averageSolveTime: 3.0 }, // 3 hours
		{ id: 2, name: 'Amanda', averageSolveTime: 5.0 }, // 5 hours
		{ id: 3, name: 'Joe', averageSolveTime: 4.5 }, // 4.5 hours
	],
};

const mockData = {
	// USING TABLE
	agents: [
		{ id: 1, name: 'Johnny', role: 'agent1', priorityMode: 'medium' },
		{ id: 2, name: 'Amanda', role: 'agent2', priorityMode: 'high' },
		{ id: 3, name: 'Joe', role: 'agent3', priorityMode: 'low' },
	],

	// USING TEXT
	numberOfTickets: 420, //DONE

	// USING TEXT & FRONTEND USING DAISY UI
	averageRating: 4.2, // DONE

	// USING TEXT
	mostFrequentIssueType: 'Software', //DONE

	// USING TEXT
	agentWithMostOpenTickets: { id: 2, name: 'Amanda', role: 'agent2', count: 45 }, //DONE

	// USING TEXT
	agentWithMostSolvedTickets: { id: 3, name: 'Joe', role: 'agent3', count: 100 }, //DONE

	// USING DOUGHNUT CHART
	numberOfSolvedTicketsAgent1: 100, //DONE
	numberOfSolvedTicketsAgent2: 70, //DONE
	numberOfSolvedTicketsAgent3: 30, //DONE

	// USING BAR CHART
	averageRatingPerAgent: [
		{ id: 1, name: 'Johnny', averageRating: 4 }, //DONE
		{ id: 2, name: 'Amanda', averageRating: 3 }, //DONE
		{ id: 3, name: 'Joe', averageRating: 1 }, //DONE
	],

	// USING BARCHART CHART SIDEWAYS
	averageSolveTimePerAgent: [
		{ id: 1, name: 'Johnny', averageSolveTime: 2 }, //DONE
		{ id: 2, name: 'Amanda', averageSolveTime: 7 }, //DONE
		{ id: 3, name: 'Joe', averageSolveTime: 9 }, //DONE
	],
};

export { agents, tickets, mockData2, mockData };
