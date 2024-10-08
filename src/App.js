import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

// Wrappers
import ValidateOneLink from "./pages/InvestorView/ValidateOneLink/ValidateOneLink";
import ProtectedInvestorRoutes from "./pages/Investor/ProtectedInvestorRoutes/ProtectedInvestorRoutes";
import BlogWrapper from "./components/Blog/BlogWrapper/BlogWrapper";
import EcommerceLayout from "./components/ECommerace/Layout/Layout/Layout";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Boolean for whether running on mobile application
    const currentPlatform = Capacitor.getPlatform();

    if (currentPlatform === "android" || currentPlatform === "ios") {
      dispatch(setIsMobileApp(true));
      console.log(`Running on ${currentPlatform}`);
    } else {
      dispatch(setIsMobileApp(false));
      console.log("Not running on Android or iOS");
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
    console.log("url", currentUrl);
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
      <AppUrlListener />
      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

        {/* Chat */}
        <Route path="/chats" element={<Chats />} />

        {/* StartUp */}
        {StartUpRoutes()}

        {/* OneLink */}
        <Route path="/onelink/:username/:userId" element={<ValidateOneLink />}>
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
        <Route path="/landing-page" element={<EcommerceLayout />}>
          {EcommerceRoutes()}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
