import { useNavigate } from 'react-router-dom';
import itSupport from '../../../../assets/itsupport3.jpg';

export default function Hero() {
	const navigate = useNavigate();

	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row">
					<img
						src={itSupport}
						className="max-w-full lg:max-w-xl rounded-lg shadow-2xl mb-6 lg:mb-0 lg:mr-6"
						alt="IT Support"
					/>
					<div>
						<h1 className="text-5xl font-bold">Welcome to Deskmate</h1>
						<p className="py-6">
							Your Ultimate Help Desk Buddy! <br />
							<span className="text-lg text-base-100">
								<span className="text-secondary-content font-semibold">Efficient - </span>
								<span className="text-secondary-content font-semibold">Reliable - </span>
								<span className="text-secondary-content font-semibold">Seamless</span>
							</span>
						</p>
						<button className="btn btn-secondary" onClick={() => navigate('/signup')}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
