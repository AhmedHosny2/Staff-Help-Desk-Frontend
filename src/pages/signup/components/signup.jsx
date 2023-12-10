export default function SignupComponent() {
	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">New Here?</h1>
						<p className="py-6">Signup and create an account for free.</p>
					</div>
					<div className="card shrink-0 w-full max-w-3xl shadow-2xl">
						<div className="card-body">
							<div className="flex lg:flex-row flex-col">
								<div className="flex-1 lg:mr-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text">First Name</span>
										</label>
										<input
											type="text"
											placeholder="John"
											className="input input-bordered"
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Last Name</span>
										</label>
										<input
											type="text"
											placeholder="Doe"
											className="input input-bordered"
										/>
									</div>
								</div>
							</div>

							<div className="flex lg:flex-row flex-col">
								<div className="flex-1 lg:mr-4">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Phone number</span>
										</label>
										<input
											type="text"
											placeholder="012345678901"
											className="input input-bordered"
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="form-control">
										<label className="label">
											<span className="label-text">Address</span>
										</label>
										<input
											type="text"
											placeholder="jenkings street; building no. 34; 5th floor"
											className="input input-bordered"
										/>
									</div>
								</div>
							</div>

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
							</div>
							<select className="select select-bordered w-full max-w-xs">
								<option selected>User</option>
								<option>Agent1</option>
								<option>Agent2</option>
								<option>Agent3</option>
								<option>Manager</option>
								<option>Admin</option>
							</select>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Signup</button>
								<label className="">
									<a href="#" className="label-text-alt link link-hover">
										Already have an account? Login
									</a>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
