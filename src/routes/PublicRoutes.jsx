import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import NewPasswordPopUp from "../components/PopUp/NewPasswordPopUp/NewPasswordPopUp";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import OurStartup from "../components/OurStartup/OurStartUp";
import SubscriptionSuccess from "../components/SubscriptionSuccess/SubscriptionSuccess";
import PublicRoute from "../components/Routes/PublicRoutes/PublicRoute";
import PrivateRoute from "../components/Routes/PrivateRoutes";

import Navbar2 from "../components/Navbar/NavbarForSalesLanding/Navbar2";
import Footer2 from "../components/Footer/FooterForSalesLanding/Footer2";
// import Navbar3 from "../components/Navbar/Navbar3/Navbar3";
// import SidebarPublic from "../components/SidebarPublic/SidebarPublic";

// Import the other components using lazy loading
const Home = lazy(() => import("../components/Home/Home"));
const AboutUs = lazy(() => import("../components/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("../components/ContactUs/ContactUs"));
const Service = lazy(() => import("../components/Service/Service"));

// const LinkedInCallback = lazy(() =>
//   import("../components/Login/LinkedInCallback")
// );
const Fundraising = lazy(() =>
	import("../components/Service/Fundraising/Fundraising")
);
const PitchDeck = lazy(() =>
	import("../components/Service/PitchDeck/PitchDeck")
);
const WebDevelopment = lazy(() =>
	import("../components/Service/WebDevelopment/WebDevelopment")
);
const FinancialsDocumentation = lazy(() =>
	import(
		"../components/Service/FinancialsDocumentation/FinancialsDocumentation"
	)
);
const TermsPolicy = lazy(() =>
	import("../components/TermsAndConditions/Terms")
);
const StartupConsulting = lazy(() =>
	import("../components/Service/StartupConsulting/StartupConsulting")
);
const CompliancesDeligence = lazy(() =>
	import("../components/Service/CompliancesDeligence/CompliancesDeligence")
);
const OurInvestor = lazy(() => import("../components/OurInvestor/OurInvestor"));
const TermOfService = lazy(() =>
	import("../components/TermOfService/TermOfService")
);
const CancellationRefundPolicy = lazy(() =>
	import("../components/RefundPolicy/RefundPolicy")
);
const Privacy = lazy(() => import("../components/Privacy/Privacy"));
const SecuritySafeGuard = lazy(() =>
	import("../components/SecuritySafeGuard/SecuritySafeGuard")
);
const StartUpLendingPage = lazy(() =>
	import("../pages/StartUp/StartUpLendingPage/StartUpLendingPage")
);

const SalesLandingPage = lazy(() =>
	import("../pages/StartUp/SalesLandingPage/SalesLandingPage")
);

const PortfolioPage = lazy(() =>
	import("../webDevelopment/pages/PortfolioPage/PortfolioPage")
);
const AuthorProfile = lazy(() =>
	import("../pages/Public/AuthorProfile/AuthorProfile")
);
const FounderProfile = lazy(() =>
	import("../components/Shared/FoundersProfile/FoundersProfile")
);
const PriorityDM = lazy(() =>
	import("../components/Shared/FoundersProfile/PriorityDMPage/PriorityDMPage")
);
const InvestorPublicProfile = lazy(() =>
	import("../components/InvestorPublicProfile/InvestorPublicProfile")
);

const ScheduleMeeting = lazy(() =>
	import("../components/Meetings/ScheduleMeeting/ScheduleMeeting")
);

const PublicPost = lazy(() =>
	import("../components/PublicPostPage/PublicPost")
);

const ProcedurePage = lazy(() =>
	import("../pages/StartUp/ProcedurePage/ProcedurePage")
);

const ThoughtsMain = lazy(() =>
	import("../components/Thoughts/ThoughtsMain/ThoughtsMain")
);

const ThoughtsQA = lazy(() =>
	import("../components/Thoughts/ThoughtsQuestionAnswers/ThoughtsQA")
);

const CreateQuestion = lazy(() =>
	import("../components/Thoughts/CreateQuestion/CreateQuestion")
);

function PublicRoutes() {
	const user = useSelector((state) => state.user.loggedInUser);
	return (
		<>
			<Route
				path="/"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<Home />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/reset-password"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<NewPasswordPopUp />
					</Suspense>
				}
			/>
			<Route
				path="/about"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<AboutUs />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/contactus"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<ContactUs />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/service"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<Service />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/fundraising"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<Fundraising />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/pitch-deck"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<PitchDeck />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/financials-document"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<FinancialsDocumentation />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/sturtup-consulting"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<StartupConsulting />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/complience"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<CompliancesDeligence />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/web-development"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<WebDevelopment />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/our-investor"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<OurInvestor />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/our-startup"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<OurStartup />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/term-of-service"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<TermOfService />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/privacy"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<Privacy />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/refund-policy"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<CancellationRefundPolicy />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/terms-and-conditions"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<TermsPolicy />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/security-safeguard"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<SecuritySafeGuard />
						<Footer />
					</Suspense>
				}
			/>

			<Route
				path="/web-development/portfolio"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						{/* <Navbar /> */}
						<PortfolioPage />
						<Footer />
					</Suspense>
				}
			/>

			<Route path="/signup" element={<Register />} />
			<Route path="/login" element={<Login />} />
			{/* <Route path="/linkedin" element={<LinkedInCallback />} /> */}
			<Route
				path="/start-up"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar />
						<StartUpLendingPage />
						<Footer />
					</Suspense>
				}
			/>
			<Route
				path="/know-startup"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar2 />
						<SalesLandingPage />
						<Footer2 />
					</Suspense>
				}
			/>

			<Route
				path="/procedure"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<Navbar2 />
						<ProcedurePage />
					</Suspense>
				}
			/>

			<Route
				path="/author-profile/:username/:userId"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<AuthorProfile />
					</Suspense>
				}
			/>
			<Route
				path="/payment/success"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<SubscriptionSuccess />
					</Suspense>
				}
			/>

			{/* Below routes are public routes with public Navbar and Sidebar */}
			<Route element={user ? <PrivateRoute /> : <PublicRoute />}>
				<Route
					path="/founder/:username"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<FounderProfile />
						</Suspense>
					}
				/>
				<Route
					path="/priority-dm/:username"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<PriorityDM />
						</Suspense>
					}
				/>
				<Route
					path="/investor/:username"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<InvestorPublicProfile />
						</Suspense>
					}
				/>
				<Route
					path="/meeting/schedule/:username/:meetingId"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<ScheduleMeeting />
						</Suspense>
					}
				/>
				<Route
					path="/post_details/:postId"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<PublicPost />
						</Suspense>
					}
				/>
				<Route
					path="/thoughts"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<ThoughtsMain />
						</Suspense>
					}
				/>
				<Route
					path="/thoughts/question/:id"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<ThoughtsQA />
						</Suspense>
					}
				/>
				<Route
					path="/thoughts/create-question"
					element={
						<Suspense fallback={<SuspenseLoader />}>
							<CreateQuestion />
						</Suspense>
					}
				/>
			</Route>
		</>
	);
}

export default PublicRoutes;
