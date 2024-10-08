import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";

const InvestorOneLinkProfile = lazy(() =>
  import(
    "../pages/InvestorOneLink/InvestorOneLinkProfile/InvestorOneLinkProfile"
  )
);
const InvestorOneLinkStartups = lazy(() =>
  import(
    "../pages/InvestorOneLink/InvestorOneLinkStartups/InvestorOneLinkStartups"
  )
);
const InvestorOneLinkPhilosophy = lazy(() =>
  import(
    "../pages/InvestorOneLink/InvestorOneLinkInvestment/InvestorOneLinkPhilosophy"
  )
);
const InvestorOneLinkAppointment = lazy(() =>
  import(
    "../pages/InvestorOneLink/InvestorOneLinkAppointment/InvestorOneLinkAppointment"
  )
);
export default function InvestorOneLinkRoutes() {
  return (
    <>
      <Route
        index
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOneLinkProfile />
          </Suspense>
        }
      />

      <Route
        path="startups-invested"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOneLinkStartups />
          </Suspense>
        }
      />

      <Route
        path="investment-philosophy"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOneLinkPhilosophy />
          </Suspense>
        }
      />

      <Route
        path="appointment"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOneLinkAppointment />
          </Suspense>
        }
      />

    </>
  );
}
