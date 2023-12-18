import ColorCard from './components/colorCard';

export default function Colors() {
	return (
		<>
			<div className="flex items-center justify-center my-16">
				<div className="card lg:card-side w-9/12">
					<figure>
						{/* <img
							src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
							alt="Album"
						/> */}
						<ColorCard />
					</figure>
					<div className="card-body">
						<h2 className="card-title">Customize the entire website!</h2>
						<p>
							As an <span className="text-lg text-primary">Admin</span>, put your own touch
							onto the website.
						</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">Login and customize now?</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
