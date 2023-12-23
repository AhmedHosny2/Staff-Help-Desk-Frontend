import { getTailwindColorHex } from './getTailwindColorHex';

const backgroundColor = getTailwindColorHex('text-neutral-content');
const primaryColor = getTailwindColorHex('text-primary');
const secondaryColor = getTailwindColorHex('text-neutral-content');
const textColor = getTailwindColorHex('text-neutral');

export const getToastStyle = () => {
	return {
		duration: 2000,
		style: {
			padding: '16px',
			color: textColor,
			background: backgroundColor,
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
