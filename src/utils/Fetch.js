exports.customFetch = async (url, method, inputData) => {
	let newData = null;
	let isPending = false;
	let error = null;
	let curStatus = null;
	let statusText = null;
	let message = null;

	const body = JSON.stringify(inputData);

	const requestOptions = {
		method: method,
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: method !== 'GET' ? body : undefined,
	};

	try {
		const response = await fetch(url, requestOptions);

		// if (!response.ok) {
		// 	throw new Error('Could not fetch the data for that resource');
		// }

		curStatus = response.status;
		const data = await response.json();
		newData = data.data;
		statusText = data.status;
		message = data.message;

		error = null;
	} catch (err) {
		isPending = false;
		error = err.message;
	}

	// console.log('NEW DATA:', newData);
	// console.log('isPending:', isPending);
	// console.log('error:', error);
	// console.log('curStatus:', curStatus);
	// console.log('statusText:', statusText);
	// console.log('message:', message);

	return {
		newData,
		isPen: isPending,
		err: error,
		newStatus: curStatus,
		newStatusText: statusText,
		newMessage: message,
	};
};
