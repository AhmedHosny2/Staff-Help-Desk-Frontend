import React from 'react';

export default function Section2({ data }) {
	return (
		<>
			<div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
				<div className="flex flex-wrap">
					<div className="collapse collapse-plus bg-base-200 mb-6">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium">Description</div>
						<div className="collapse-content">
							<p>{data.description}</p>
						</div>
					</div>

					<div className="collapse collapse-plus bg-base-200">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium">Solution</div>
						<div className="collapse-content">
							<textarea
								className="textarea textarea-lg w-full text-sm"
								style={{
									height: '7rem',
									minHeight: '7rem',
									maxHeight: '10rem',
								}}
								placeholder="To solve your problem you should . . ."
							></textarea>
							<div className="flex">
								<button className="btn btn-outline btn-success ml-auto">
									Solve Ticket
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
