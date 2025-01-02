// import { BsLink45Deg } from "react-icons/bs";
// import { IoCompassOutline } from "react-icons/io5";
// import { CiSquarePlus } from "react-icons/ci";
// import { FiUsers } from "react-icons/fi";
// import { HiOutlineHome } from "react-icons/hi2";
import {
	Home,
	Community,
	AddPost,
	Profile,
	Onelink,
} from "../../../Images/MobileFooter/index";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
	toggleCreatePostModal,
	toggleinvestorCreatePostModal,
} from "../../../Store/features/design/designSlice";
import "./MobileNavbar.scss";

export default function MobileNavbar({ isInvestor = false }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleToggleCreatePostModal = () => {
		navigate(isInvestor ? "/investor/home" : "/home");
		dispatch(
			isInvestor ? toggleinvestorCreatePostModal() : toggleCreatePostModal()
		);
	};

	return (
		<div className="mobile-bottom-toolbar container p-2 shadow d-flex gap-1 justify-content-between border-top align-items-center px-3 d-md-none text-secondary">
			{/* Home */}
			<div className="d-flex flex-column align-items-center mx-3">
				<NavLink to={isInvestor ? "/investor/home" : "/home"}>
					<img src={Home} className="nav-link-icon" alt="Home" />
				</NavLink>
				<span className="nav-link-text">Home</span>
			</div>

			{/* Onelink */}
			<div className="d-flex flex-column align-items-center mx-3">
				{isInvestor ? (
					<>
						<NavLink to="/investor/onelink">
							<img src={Onelink} className="nav-link-icon" alt="Home" />
						</NavLink>
						<span className="nav-link-text">{"OneLink"}</span>
					</>
				) : (
					<>
						<NavLink to="/onelink">
							<img src={Onelink} className="nav-link-icon" alt="Home" />
						</NavLink>
						<span className="nav-link-text">{"OneLink"}</span>
					</>
				)}
			</div>

			{/* Post */}
			<div
				className="d-flex flex-column align-items-center mx-3 mt-1"
				onClick={handleToggleCreatePostModal}
			>
				<img src={AddPost} className="nav-link-icon" alt="Home" />
				<span className="nav-link-text">Post</span>
			</div>

			{/* Community */}
			<div className="d-flex flex-column align-items-center mx-3">
				<NavLink to="/MyCommunity">
					<img src={Community} className="nav-link-icon" alt="Home" />
				</NavLink>
				<span className="nav-link-text">{"Community"}</span>
			</div>

			{/* Profile */}
			<div className="d-flex flex-column align-items-center mx-3">
				<NavLink to="/profile">
					<img src={Profile} className="nav-link-icon" alt="Home" />
				</NavLink>
				<span className="nav-link-text">{"Profile"}</span>
			</div>
		</div>
	);
}
