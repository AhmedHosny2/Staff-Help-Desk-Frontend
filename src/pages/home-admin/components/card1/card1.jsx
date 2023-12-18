import './card1.css';

function card1({ first, second }) {
	return (
		<>
			<div className="card1 hover:bg-primary bg-secondary">
				<div className="card1-first-content">
					<span>{first}</span>
				</div>
				<div className="card1-second-content">
					<span>{second}</span>
				</div>
			</div>
		</>
	);
}

export default card1;
