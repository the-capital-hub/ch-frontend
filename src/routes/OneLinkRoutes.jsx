import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";

const FolderContents = lazy(() =>
  import("../components/Investor/FolderContents/FolderContents")
);
const Profile = lazy(() => import("../pages/InvestorView/Profile/Profile"));
const Company = lazy(() => import("../pages/InvestorView/Company/Company"));
const OnePager = lazy(() => import("../pages/InvestorView/OnePager/OnePager"));
const DocumentationIV = lazy(() =>
  import("../pages/InvestorView/Documentation/Documentation")
);
const InvestNow = lazy(() =>
  import("../pages/InvestorView/InvestNow/InvestNow")
);

function OneLinkRoutes() {
  return (
    <>
      <Route
        path=""
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Company />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="onePager"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <OnePager />
          </Suspense>
        }
      />
      <Route
        path="documentation"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <DocumentationIV />
          </Suspense>
        }
      />
      <Route
        path="investnow"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestNow />
          </Suspense>
        }
      />
      <Route
        path="documentation/:route"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <FolderContents />
          </Suspense>
        }
      />
      {/* <Route path="investNow" element={<DocumentationIV />} /> */}
    </>
  );
}

export default OneLinkRoutes;
