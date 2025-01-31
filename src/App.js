import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { selectLoggedInUserId } from "./Store/features/user/userSlice";
import axios from "axios";
import { environment } from "./environments/environment";
import { useState } from "react";
import { Suspense } from "react";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.scss";

// Wrappers
import ValidateOneLink from "./pages/InvestorView/ValidateOneLink/ValidateOneLink";
import ProtectedInvestorRoutes from "./pages/Investor/ProtectedInvestorRoutes/ProtectedInvestorRoutes";
import BlogWrapper from "./components/Blog/BlogWrapper/BlogWrapper";
// import EcommerceLayout from "./components//Layout/Layout/Layout";
import InvestorOneLinkLayout from "./pages/InvestorOneLink/InvestorOneLinkLayout/InvestorOneLinkLayout";

// Pages
import Chats from "./pages/ChatPages/Chats/Chats";

// Routes
import StartUpRoutes from "./routes/StartUpRoutes";
import OneLinkRoutes from "./routes/OneLinkRoutes";
import InvestorRoutes from "./routes/InvestorRoutes";
import BlogRoutes from "./routes/BlogRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import EcommerceRoutes from "./routes/EcommerceRoutes";
import NotFound404 from "./pages/Error/NotFound404/NotFound404";
import { useDispatch } from "react-redux";
import {
	setIsMobileApp,
	setIsMobileView,
	setShowOnboarding,
} from "./Store/features/design/designSlice";
import { useEffect } from "react";
import InvestorOneLinkRoutes from "./routes/InvestorOneLinkRoutes";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import AppUrlListener from "./pages/AppUrlListener/AppUrlListener";
import AdminRoutes from "./routes/AdminRoutes";
import CommunityRoutes from "./routes/CommunityRoutes";
import Community from "./components/Investor/Community/Community";
import PublicCommunityView from "./components/Investor/Community/PublicCommunityView.jsx";
import { ToastContainer } from "react-toastify";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// Boolean for whether running on mobile application
		const currentPlatform = Capacitor.getPlatform();

		if (currentPlatform === "android" || currentPlatform === "ios") {
			dispatch(setIsMobileApp(true));
		} else {
			dispatch(setIsMobileApp(false));
		}

		// Handle mobile size for web app
		window.scrollTo({ top: 0, behavior: "smooth" });
		function handleWindowResize() {
			const isMobile = window.innerWidth <= 820;
			dispatch(setIsMobileView(isMobile));
			dispatch(setShowOnboarding(false));
		}
		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	//Back functionality for mobile app
	CapacitorApp.addListener("backButton", ({ canGoBack }) => {
		const currentUrl = window.location.href;
		if (
			!canGoBack ||
			currentUrl === "https://localhost/home" ||
			currentUrl === "https://localhost/investor/home"
		) {
			CapacitorApp.exitApp();
		} else {
			window.history.back();
		}
	});

	return (
		<Router>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
				<ToastContainer position="top-right" autoClose={3000} />
				<AppUrlListener />
				<Routes>
					{/* Public Routes */}
					{PublicRoutes()}

					{/* Community Routes */}
					<Route
						path="/community/:communityId"
						element={<CommunityAccessControl />}
					/>
					{/* Chat */}
					<Route path="/chats" element={<Chats />} />

					{/* StartUp */}
					{StartUpRoutes()}

					{/* OneLink */}
					<Route
						path="/onelink/:username/:userId"
						element={<ValidateOneLink />}
					>
						{OneLinkRoutes()}
					</Route>

					{/* Investor */}
					<Route path="/investor" element={<ProtectedInvestorRoutes />}>
						{InvestorRoutes()}
					</Route>

					{/* Investor OneLink */}
					<Route
						path="/investor/onelink/:oneLink/:userId"
						element={<InvestorOneLinkLayout />}
					>
						{InvestorOneLinkRoutes()}
					</Route>

					{/* Blogs */}
					<Route path="/blog" element={<BlogWrapper />}>
						{BlogRoutes()}
					</Route>

					{/* E-Commerce */}
					{/* <Route path="/landing-page" element={<EcommerceLayout />}>
						{EcommerceRoutes()}
					</Route> */}

					{/* Admin Routes */}
					<Route path="/admin/*" element={<AdminRoutes />} />

					{/* 404 Not Found */}
					<Route path="*" element={<NotFound404 />} />
				</Routes>
			</GoogleOAuthProvider>
		</Router>
	);
}

function CommunityAccessControl() {
	const { communityId } = useParams();
	const [loading, setLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);
	const loggedInUserId = useSelector(selectLoggedInUserId);

	useEffect(() => {
		checkAccess();
	}, [communityId]);

	const checkAccess = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.get(
				`${environment.baseUrl}/communities/getCommunityById/${communityId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const community = response.data.data;
			const isAdmin = community.adminId._id === loggedInUserId;
			const isMember = community.members.some(data => data.member._id === loggedInUserId);
			console.log("community members", community.members);
			setHasAccess(isAdmin || isMember);
			setLoading(false);
		} catch (error) {
			console.error("Error checking access:", error);
			setLoading(false);
			setHasAccess(false);
		}
	};

	if (loading) {
		return <SuspenseLoader />;
	}

	return hasAccess ? (
		<Community />
	) : (
		<Suspense fallback={<SuspenseLoader />}>
			<Navbar />
			<PublicCommunityView />
			<Footer />
		</Suspense>
	);
}

export default App;
