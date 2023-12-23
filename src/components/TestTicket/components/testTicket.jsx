import ProfileSection from './profileSection';
import Section1 from './section1';
import Section2 from './section2';

export default function TestTicketComponent({ data }) {

	return (
		<>
			<div className="container my-24 mx-auto md:px-6">
				<section className="mb-32">
					<div className="bringBack relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat bg-[url('https://mdbcdn.b-cdn.net/img/new/textures/full/284.jpg')]"></div>
					<div className="container px-6 md:px-12">
						{/* START PARENT CONTAINER */}
						<div className="block rounded-lg bg-transparent px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-transparent dark:shadow-black/20 md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
							<ProfileSection data={data} />
							<div className="divider"></div>
							<h2 className="text-center my-16 text-3xl font-bold">Ticket Info</h2>

							<div className="flex flex-wrap">
								{/* START SECTION 1 (on the left) */}
								<Section1 data={data} />
								{/* END SECTION 1 (on the left) */}
								{/* START SECTION 2 (on the right) */}
								<Section2 data={data} />
								{/* END SECTION 2 (on the right) */}
							</div>
						</div>
						{/* END PARENT CONTAINER */}
					</div>
				</section>
			</div>
		</>
	);
}
