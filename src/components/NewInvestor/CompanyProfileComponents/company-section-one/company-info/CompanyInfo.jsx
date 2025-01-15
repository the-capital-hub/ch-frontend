import {
	Location,
	Calendar,
	CircleArrow,
} from "../../../../../Images/Investor/CompanyProfile";
import { GiProgression } from "react-icons/gi";
import IconCard from "../../shared-components/icon-card/IconCard";
import "./CompanyInfo.scss";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export default function CompanyInfo({
	name,
	logo,
	location,
	tagline,
	foundedYear,
	lastFunding,
	industry,
	stage,
	sector,
	deleteCompany,
	companyDelete,
	userId,
	founderId,
}) {
	// console.log("lastFunding", lastFunding);
	return (
		<div className="company__header d-flex flex-column flex-lg-row gap-2 ">
			<div className="company__image">
				<img
					src={logo}
					alt={name}
					style={{
						width: "110px",
						height: "110px",
						objectFit: "cover",
						borderRadius: "50%",
					}}
					loading="lazy"
				/>
			</div>

			<div
				className="company__details d-flex flex-column gap-3 justify-content-around justify-content-xl-start"
				style={{ marginLeft: "0.5rem" }}
			>
				<div className="company__headings">
					<h3 className="company__name">{name || "NA"}</h3>
					{/*<p className="company__type">{industry|| "NA"}</p>*/}
					<p className="company__type">{tagline || "NA"}</p>
				</div>
				<div
					className="icon__details d-flex gap-3 align-items-start"
					style={{ display: "flex", flexWrap: "wrap" }}
				>
					<IconCard
						src={Location}
						alt={"location icon"}
						text={`${location || "NA"}`}
						key="location"
					/>
					<IconCard
						src={Calendar}
						alt={"calendar icon"}
						text={`Founded in, ${foundedYear || "NA"}`}
						key="founded"
					/>
					<IconCard
						src={CircleArrow}
						alt={"rising arrow icon"}
						text={`Last funding in 
              ${
								lastFunding
									? new Date(lastFunding).toLocaleString("en-US", {
											month: "short",
											year: "numeric",
									  })
									: "NA"
							}`}
						key="funding"
					/>
					<div
						className={`iconCard__container d-flex align-items-center gap-1  `}
					>
						<GiProgression color="#898989" />
						<p className="icon__text">{`Stage of funding ${
							stage ? stage : "NA"
						}`}</p>
					</div>
					<div
						className={`iconCard__container d-flex align-items-center gap-1`}
					>
						<HiOutlineBuildingOffice2 color="#898989" />
						<p className="icon__text" style={{ marginBottom: "0px" }}>{`${
							sector || "NA"
						}`}</p>
					</div>
				</div>
			</div>

			{userId === founderId && companyDelete && (
				<button
					className="btn-capital"
					style={{ height: "35px", padding: "0 1rem" }}
					onClick={deleteCompany}
				>
					Delete
				</button>
			)}
		</div>
	);
}
