import React, { useState, useEffect } from 'react';

export default function Countdown() {
	const [days, setDays] = useState(69);
	const [hours, setHours] = useState(10);
	const [minutes, setMinutes] = useState(24);
	const [seconds, setSeconds] = useState(15);

	useEffect(() => {
		const interval = setInterval(() => {
			// Decrease seconds
			setSeconds((prevSeconds) => {
				if (prevSeconds === 0) {
					// If seconds reach 0, reset to 59 and decrease minutes
					setMinutes((prevMinutes) => {
						if (prevMinutes === 0) {
							// If minutes reach 0, reset to 59 and decrease hours
							setHours((prevHours) => {
								if (prevHours === 0) {
									// If hours reach 0, reset to 23 and decrease days
									setDays((prevDays) => (prevDays > 0 ? prevDays - 1 : 0));
									return 23;
								}
								return prevHours - 1;
							});
							return 59;
						}
						return prevMinutes - 1;
					});
					return 59;
				}
				return prevSeconds - 1;
			});
		}, 1000);

		// Clear the interval on component unmount
		return () => clearInterval(interval);
	}, []); // Empty dependency array to run the effect only once on mount

	return (
		<>
			<div className="card-body">
				<h2 className="card-title">Time remaining untill launch...</h2>
				<div>
					<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
						<div className="flex flex-col">
							<span className="countdown font-mono text-3xl">
								<span style={{ '--value': days }}></span>
							</span>
							days
						</div>
						<div className="flex flex-col">
							<span className="countdown font-mono text-3xl">
								<span style={{ '--value': hours }}></span>
							</span>
							hours
						</div>
						<div className="flex flex-col">
							<span className="countdown font-mono text-3xl">
								<span style={{ '--value': minutes }}></span>
							</span>
							min
						</div>
						<div className="flex flex-col">
							<span className="countdown font-mono text-3xl">
								<span style={{ '--value': seconds }}></span>
							</span>
							sec
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
