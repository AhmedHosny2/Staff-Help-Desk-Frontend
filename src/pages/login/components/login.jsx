import { useNavigate } from 'react-router-dom';
import GoogleButton from './googleButton';

export default function LoginComponent({ setLoggedin }) {
	const navigate = useNavigate();
	const handleLoginClick = () => {
		setLoggedin(true);
		localStorage.setItem('loggedin', 'true');
		setTimeout(() => {
			navigate('/profile');
		}, 2500);
	};

	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Welcome Back!</h1>
						<p className="py-6">
							To keep connected with us, please log in with your personal info.
						</p>
					</div>
					<div className="card shrink-0 w-full max-w-3xl shadow-2xl">
						<div className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="email@example.com"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder=". . ."
									className="input input-bordered"
								/>
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">
										Forgot password?
									</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary" onClick={handleLoginClick}>
									Login
								</button>
								<label className="">
									<a href="#" className="label-text-alt link link-hover">
										New here? Sign up now
									</a>
								</label>
							</div>
							<div className="divider">OR</div>
							<div className="grid place-items-center">
								<GoogleButton />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
