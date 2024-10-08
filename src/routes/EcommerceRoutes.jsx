import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import ThankYouPage from "../eCommerace/pages/LandingPage/ThankYouPage/ThankYouPage";

const FoodLandingPage = lazy(() =>
  import("../eCommerace/pages/LandingPage/FoodLandingPage/FoodLandingPage")
);
const FtechLandingPage = lazy(() =>
  import("../eCommerace/pages/LandingPage/FtechLandingPage/FtechLandingPage")
);
const NikeLandingPage = lazy(() =>
  import("../eCommerace/pages/LandingPage/NikeLandingPage/NikeLandingPage")
);
const TransportLandingPage = lazy(() =>
  import(
    "../eCommerace/pages/LandingPage/TransportLandingPage/TransportLandingPage"
  )
);

function EcommerceRoutes() {
  return (
    <>
      <Route
        path="food"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <FoodLandingPage />
          </Suspense>
        }
      />
      <Route
        path="food/thank-you"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <ThankYouPage />
          </Suspense>
        }
      />
      <Route
        path="nike"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <NikeLandingPage />
          </Suspense>
        }
      />
      <Route
        path="fintech"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <FtechLandingPage />
          </Suspense>
        }
      />
      <Route
        path="fintech/thank-you"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <ThankYouPage />
          </Suspense>
        }
      />

      <Route
        path="logistics"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <TransportLandingPage />
          </Suspense>
        }
      />
      <Route
        path="logistics/thank-you"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <ThankYouPage />
          </Suspense>
        }
      />
    </>
  );
}

export default EcommerceRoutes;
