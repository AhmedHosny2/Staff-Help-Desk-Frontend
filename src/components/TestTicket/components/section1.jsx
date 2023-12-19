export default function Section1({ data }) {
	return (
		<>
			<div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
				<div className="card w-w-full xl:w-10/12 bg-neutral shadow-xl">
					<div className="card-body">
						<div className="tooltip" data-tip="Issue type">
							<h2 className="card-title">{data.issue}</h2>
						</div>
						<div className="tooltip tooltip-bottom" data-tip="Category">
							<h2 className="card-title">
								<div className="badge badge-outline">{data.category}</div>
							</h2>
						</div>
					</div>
					<figure>
						<img src={data.image} alt="Shoes" />
					</figure>
				</div>
			</div>
		</>
	);
}
