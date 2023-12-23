import PhoneMockupImage from '../../../../../assets/phoneMockupImage.webp';
import './phoneMockup.css';

export default function PhoneMockup() {
	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className="phoneMockup-card">
					<div className="phoneMockup-btn1"></div>
					<div className="phoneMockup-btn2"></div>
					<div className="phoneMockup-btn3"></div>
					<div className="phoneMockup-btn4"></div>
					<div className="phoneMockup-card-int">
						<div className="phoneMockup-hello">
							DESKMATE
							<span className="phoneMockup-hidden">
								<div className="card shadow-xl image-full mx-2 mt-6 rounded-3xl">
									<figure>
										<img src={PhoneMockupImage} alt="24/7-Support" />
									</figure>
									<div className="card-body">
										<h2 className="card-title">With Deskmate App,</h2>
										<p className="text-sm">
											solve any technical issue right from your pocket!
										</p>
										<div className="card-actions justify-end">
											<div className="badge badge-secondary">stay tuned</div>
										</div>
									</div>
								</div>
							</span>
						</div>
					</div>
					<div className="phoneMockup-top">
						<div className="phoneMockup-camera">
							<div className="phoneMockup-int"></div>
						</div>
						<div className="phoneMockup-speaker"></div>
					</div>
				</div>
			</div>
		</>
	);
}
