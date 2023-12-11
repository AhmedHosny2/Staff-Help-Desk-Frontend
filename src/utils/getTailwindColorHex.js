exports.getTailwindColorHex = (colorClass) => {
	const element = document.createElement('div');
	element.className = `hidden ${colorClass}`;
	document.body.appendChild(element);
	const colorHex = getComputedStyle(element).color;
	document.body.removeChild(element);

	return colorHex;
};
