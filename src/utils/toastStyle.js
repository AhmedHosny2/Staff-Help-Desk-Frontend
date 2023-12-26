import { getTailwindColorHex } from './getTailwindColorHex';

export const getToastStyle = () => {
	const backgroundColor = getTailwindColorHex('text-neutral-content');
	const primaryColor = getTailwindColorHex('text-primary');
	const secondaryColor = getTailwindColorHex('text-neutral-content');
	const textColor = getTailwindColorHex('text-neutral');

	return {
		duration: 2000,
		style: {
			padding: '16px',
			color: textColor,
			background: backgroundColor,
			zIndex: 999999,
		},
		iconTheme: {
			primary: primaryColor,
			secondary: secondaryColor,
		},
	};
};

export const removeToast = (toast, toastId) => {
	setTimeout(() => {
		toast.remove(toastId);
	}, 2300);
};

export const ToastColors = () => {
	const backgroundColor = getTailwindColorHex('text-neutral-content');
	const primaryColor = getTailwindColorHex('text-primary');
	const secondaryColor = getTailwindColorHex('text-neutral-content');
	const textColor = getTailwindColorHex('text-neutral');

	// You can use these colors in your component
	return {
		backgroundColor,
		primaryColor,
		secondaryColor,
		textColor,
	};
};

// OLD CODE
// import { getTailwindColorHex } from './getTailwindColorHex';

// const backgroundColor = getTailwindColorHex('text-neutral-content');
// const primaryColor = getTailwindColorHex('text-primary');
// const secondaryColor = getTailwindColorHex('text-neutral-content');
// const textColor = getTailwindColorHex('text-neutral');

// export const getToastStyle = () => {
// 	return {
// 		duration: 2000,
// 		style: {
// 			padding: '16px',
// 			color: textColor,
// 			background: backgroundColor,
// 			zIndex: 999999,
// 		},
// 		iconTheme: {
// 			primary: primaryColor,
// 			secondary: secondaryColor,
// 		},
// 	};
// };

// export const removeToast = (toast, toastId) => {
// 	setTimeout(() => {
// 		toast.remove(toastId);
// 	}, 2300);
// };
