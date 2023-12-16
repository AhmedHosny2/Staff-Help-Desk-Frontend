import './colorCard.css';

export default function ColorCard() {
	return (
		<>
			<div className="ColorCard-container">
				<div className="ColorCard-palette">
					<div className="ColorCard-color">
						<span>264653</span>
					</div>
					<div className="ColorCard-color">
						<span>2A9D8F</span>
					</div>
					<div className="ColorCard-color">
						<span>E9C46A</span>
					</div>
					<div className="ColorCard-color">
						<span>F4A261</span>
					</div>
					<div className="ColorCard-color">
						<span>E76F51</span>
					</div>
				</div>
				<div className="stats bg-primary">
					<span className="text-neutral-content">Choose from 28 colors</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<path d="M4 7.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S5.5 9.83 5.5 9 4.83 7.5 4 7.5zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 7.5 9 7.5z"></path>
					</svg>
				</div>
			</div>
		</>
	);
}
