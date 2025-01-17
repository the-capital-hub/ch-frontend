import React from "react";
import './ProcessNew.scss';
import step4Img from "../images/step4ProfileCreated.png"; 
import step5Img from "../images/founterCard.png";
import step6Img from "../images/startupCard.png";

const ProcessNew = () => {
    return (
        <div className="process-new-container">
            <h1>Follow the Steps</h1>
            <div className="process-steps-wrapper">
                {/* Step 4 */}
                <div className="process-step">
                    <div className="step-header">
                        <h2> Explore 1000+ investors and 500 + VC’s</h2>
						
                    </div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Access resources that help you grow efficiently.</p>
                    <div className="step-content">
                        <img src={step4Img} alt="Step 4" className="step-img" />
                    </div>
                </div>

				<div className="process-two">
					{/* Step 5 */}
					<div className="process-step">
						<div className="step-header">
							<p className="step-number">Step 5</p>
							<h2>Reach Out to Mentors & Investors</h2>
						</div>
						<div className="step-content">
							<img src={step5Img} alt="Step 5" className="step-img" />
							<p>Gain valuable insights from industry experts and investors. Build your network for future growth.</p>
							<div className="step-buttons">
								<button className="primary-button">Explore Mentors</button>
							</div>
						</div>
					</div>
					{/* Step 6 */}
					<div className="process-step">
						<div className="step-header">
							<p className="step-number">Step 6</p>
							<h2>Raise Investments Efficiently</h2>
						</div>
						<div className="step-content">
							<img src={step6Img} alt="Step 6" className="step-img" />
							<p>Efficiently connect with investors to secure funding for your business.</p>
							<div className="step-buttons">
								<button className="primary-button">Get Started Now</button>
							</div>
						</div>
					</div>
				</div>
                
            </div>
        </div>
    );
};

export default ProcessNew;