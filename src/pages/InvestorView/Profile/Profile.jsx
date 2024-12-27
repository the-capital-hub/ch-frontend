// import profilePic from "../../../Images/investorIcon/profilePic.webp";
// import AddUserIcon from "../../../Images/investorIcon/Add-User.svg";
// import { Link } from "react-router-dom";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
// import { useSelector } from "react-redux";
// import MileStoneCard from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
import "./Profile.scss";
import { useParams } from "react-router-dom";
import { getUserById, getStartupByFounderId } from "../../../Service/user";
import { useState, useEffect } from "react";
import ColorCard from "../../../components/Investor/InvestorGlobalCards/ColoredCards/ColorCard";
// import CoinIcon from "../../../Images/investorView/Rectangle.png";
import {
	About1,
	About2,
	About3,
	About4,
	Revenue1,
	Revenue2,
	// Revenue3,
} from "../../../Images/Investor/CompanyProfile";
// import Milestones from "../../../components/Investor/CompanyProfilePageComponents/Milestones/Milestones";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import BatchImag from "../../../Images/tick-mark.png";
import MobileOneLinkNavbar from "../../../components/Shared/MobileOnelinkNavbar/MobileOneLinkNavbar";

function Profile() {
	const { username } = useParams();
	const { userId } = useParams();
	const [user, setUser] = useState([]);
	const [colorCard, setColorCard] = useState([]);

	useEffect(() => {
		document.title = "Profile - OneLink | The Capital Hub";
		getUserById(username, userId)
			.then(({ data }) => {
				setUser(data);
				//console.log("userss", data);
				getStartupByFounderId(data._id)
					.then(({ data }) => {
						setColorCard(data.colorCard);
					})
					.catch(() => setColorCard([]));
			})
			.catch(() => setUser([]));
	}, [userId, username]);
	return (
    <>
    <MobileOneLinkNavbar/>
		<div className="">
			<MaxWidthWrapper>
				{user.length !== 0 ? (
					<div className="profile_main_container">
						{/* Added d-flex flex-column gap-3 here. Easy to manipulate - Srihari */}
						<div className="mb-5 d-flex flex-column gap-3">
							{/* Profile Header */}

							<div className=" box px-4 py-3">
								<div className="image_name_section ">
									<img
										className="rounded-cirlce"
										src={user?.profilePicture}
										alt="profileimage"
									/>
									<div className="left_profile_text flex_content ms-3">
										<h2
											className="typography"
											style={{ textDecoration: "none" }}
										>
											{user?.firstName} {user?.lastName}{" "}
											{user?.isSubscribed && (
												<img
													src={BatchImag}
													style={{
														width: "1.4rem",
														height: "1.4rem",
														objectFit: "contain",
														marginLeft: "4px",
														marginBottom: "4px",
													}}
													alt="Batch Icon"
												/>
											)}
										</h2>
										<span className="small_typo">
											{user?.designation || ` `}, {user.company}
										</span>
										<span className="small_typo" style={{ display: "block" }}>
											{" "}
											{user?.location} | {user?.experience} of Experience
										</span>
									</div>
								</div>

								{/* <div className="col-5">
                        <div className="connect_btn m-4">
                          <button>
                            <img src={AddUserIcon} />
                            <span>Connect</span>
                          </button>
                        </div>
                      </div> */}

								{/* Profile details */}

								{/* <div className="designation mt-2">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <strong className="designation_list">
                            Current company
                          </strong>
                        </td>
                        <td
                          className="small_typo"
                          style={{ marginBottom: "1rem" }}
                        >
                          {user.company}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="designation_list">
                            Designation
                          </strong>
                        </td>
                        <td
                          className="small_typo"
                          style={{ marginBottom: "1rem" }}
                        >
                          {user?.designation}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="designation_list">
                            Education
                          </strong>
                        </td>
                        <td
                          className="small_typo"
                          style={{ marginBottom: "1rem" }}
                        >
                          {user?.education}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="designation_list">
                            Experience
                          </strong>
                        </td>
                        <td
                          className="small_typo"
                          style={{ marginBottom: "1rem" }}
                        >
                          {user?.experience}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
							</div>

							{/* <div className="row">
                <div className="col-12 mt-2">
                  <div className=" box ">
                    <div className="personal_information_header">
                      <h2 className="typography">Personal Information</h2>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="designation_info">
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <strong className="designation_list">
                                  Firstname
                                </strong>
                              </td>
                              <td
                                className="small_typo"
                                style={{ marginBottom: "1rem" }}
                              >
                                {user?.firstName}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong className="designation_list">
                                  LastName
                                </strong>
                              </td>
                              <td
                                className="small_typo"
                                style={{ marginBottom: "1rem" }}
                              >
                                {user?.lastName}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong className="designation_list">Email</strong>
                              </td>
                              <td
                                className="small_typo"
                                style={{ marginBottom: "1rem" }}
                              >
                                {user?.email}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong className="designation_list">
                                  Mobile number
                                </strong>
                              </td>
                              <td
                                className="small_typo"
                                style={{ marginBottom: "1rem" }}
                              >
                                {user?.phoneNumber}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

							{/* Bio */}
							<div className="box">
								{/* <div className="personal_information_header">
                  <h2 className="typography">Bio</h2>
                </div> */}
								<div className="col-12 mt-2">
									<div className="designation_info">
										<p className="small_typo_bio">{user?.bio}</p>
									</div>
								</div>
								{/* <div className="col-12 mt-2 designation_see_more">
                  <Link to={"/"}>See more</Link>
                </div> */}
							</div>
							{/* Bio End */}

							{/* Milestones */}

							{/* <div className="border box">
                <Milestones
                  headingClass={"typography"}
                  containerClass={"p-3"}
                  theme="startup"
                  oneLink={userId}
                /> */}
							{/* <div className="personal_information_header">
                      <h2 className="typography">Milestones</h2>
                      <div className="milestone_see_more">
                        <Link to={"/"}>See more</Link>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <MileStoneCard userId={user._id} />
                    </div> */}
							{/* </div> */}

							{/* Company Details */}

							<CompanyDetailsCard
								userDetails={user}
								className={"mt-2"}
								isOnelink={true}
								theme="startup"
							/>

							{/* Color Cards */}
							{/* <h6 className="div__heading">Current Funding</h6>
              <div className="card_holder">
                <ColorCard
                  color="white"
                  background="#BB98FF"
                  text="Valuation"
                  image={About1}
                  amount={colorCard?.last_round_investment || 0}
                  isOneLink={true}
                />
                <ColorCard
                  color="white"
                  background="#DAC191"
                  text="Total Investment"
                  image={About2}
                  amount={colorCard?.total_investment || 0}
                  isOneLink={true}
                />
                <ColorCard
                  color="white"
                  background="#DCDCDC"
                  text="No.of Investers"
                  image={About3}
                  amount={colorCard?.no_of_investers || 0}
                  isOneLink={true}
                  noRupee={true}
                />
                <ColorCard
                  color="white"
                  background="#2B2B2B"
                  text="Fund ask"
                  image={About4}
                  amount={colorCard?.fund_ask || 0}
                  isOneLink={true}
                />
                <ColorCard
                  color="white"
                  background="#FF7373"
                  text="Valuation"
                  image={Revenue1}
                  amount={colorCard?.valuation || 0}
                  isOneLink={true}
                />
                <ColorCard
                  color="white"
                  background="#9198DA"
                  text="Funds raised"
                  image={Revenue2}
                  amount={colorCard?.raised_funds || 0}
                  isOneLink={true}
                />
              </div> */}
						</div>
					</div>
				) : (
					<div className="d-flex w-100 min-vh-100 justify-content-center white-to-grey border shadow-sm rounded-4 pt-5 ">
						<SpinnerBS colorClass={"d-l-grey"} />
					</div>
				)}
			</MaxWidthWrapper>
		</div>
    </>
	);
}

export default Profile;
