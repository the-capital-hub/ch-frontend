import React from "react";
import "./PersonAbout.scss";

export default function PersonAbout({
	bio,
	firstName,
	lastName,
	email,
	mobileNumber,
	startUp,
	investor,
	experience,
	education,
	designation,
	companyName,
}) {
	return (
		<>
			<article
				className="person__about d-flex flex-column gap-2 md:gap-4 flex-lg-row gap-lg-0 mt-2 pb-xl-3 border-bottom"
				style={{ color: "var(--d-l-grey)" }}
			>
				{/* <h6 className="div__heading__person__profile">Bio:</h6> */}
				<p className="about__text">{bio}</p>
			</article>
			<article
				className="name_number d-flex flex-column gap-4 mt-2"
				style={{ color: "var(--d-l-grey)" }}
			>
				<h6
					className="div__heading"
					style={{ textDecoration: "none", fontSize: "15px" }}
				>
					Personal Information:
				</h6>

				<div className="personal_info_grid_3">
					<div
						className=""
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p
							className="div__heading field-text"
							style={{
								paddingRight: "10px",
								color: "#8D8D8D",
								textDecoration: "none",
							}}
							// background: #8D8D8D;
						>
							Company Name:
						</p>
						<p className="about__text field-text">
							{/* {startUp?.company
								? startUp?.company
								: investor?.companyName
								? investor?.companyName
								: "No company"} */}
							{companyName}
						</p>
					</div>
					<div
						className=""
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p
							className="div__heading field-text"
							style={{
								paddingRight: "10px",
								color: "#8D8D8D",
								textDecoration: "none",
							}}
						>
							Education:
						</p>
						<p className="about__text field-text">{education}</p>
					</div>
					<div
						className=""
						style={{ display: "flex", flexDirection: "column" }}
					>
						<p
							className="div__heading field-text"
							style={{
								paddingRight: "10px",
								color: "#8D8D8D",
								textDecoration: "none",
							}}
						>
							Experience:
						</p>
						<p className="about__text field-text">{experience}</p>
					</div>

					<>
						{/* <div className="">
              <p className="fw-lighter fs-5">First Name</p>
              <p className="about__text fs-5 field-text">{firstName}</p>
            </div> */}
						{/* <div className="">
              <p className="fw-lighter fs-5">Email Address</p>
              <p className="about__text fs-5 field-text">{email}</p>
            </div> */}
					</>

					{/* <div className="">
              <p className="fw-lighter fs-5">Last Name</p>
              <p className="fw-medium fs-5 field-text">{lastName}</p>
            </div> */}
					{/* <div className="">
              <p className="fw-lighter fs-5">Mobile Number</p>
              <p className="fw-medium fs-5 field-text">{mobileNumber}</p>
            </div> */}
					{/* <div className="" style={{ display: "flex", flexDirection: "column" }}>
              <p
                className="div__heading field-text"
                style={{ paddingRight: "10px", color: "#8D8D8D", textDecoration: "none" }}
                // background: #8D8D8D;

              >
                Company Name:
              </p>
              <p className="about__text field-text">
                {startUp?.company
                  ? startUp?.company
                  : investor?.companyName
                  ? investor?.companyName
                  : "No company"}
              </p>
            </div>
            <div className="" style={{ display: "flex", flexDirection: "column" }}>
              <p
                className="div__heading field-text"
                style={{ paddingRight: "10px", color: "#8D8D8D", textDecoration: "none" }}
              >
                Education:
              </p>
              <p className="about__text field-text">{education}</p>
            </div> */}

					{/* <div className="" style={{ display: "flex" }}>
              <p
                className="div__heading field-text"
                style={{ paddingRight: "10px" }}
              >
                Designation:
              </p>
              <p className="about__text field-text">{designation}</p>
            </div> */}

					{/* <div className="" style={{ display: "flex", flexDirection: "column" }}>
              <p
                className="div__heading field-text"
                style={{ paddingRight: "10px", color: "#8D8D8D", textDecoration: "none" }}
              >
                Experience:
              </p>
              <p className="about__text field-text">{experience}</p>
            </div> */}
				</div>
			</article>
		</>
	);
}
