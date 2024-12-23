import { Suspense, lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import SinglePost from "../components/SinglePost/SinglePost";
import Achievements from "../pages/StartUp/Achievements/Achievements";

const InvestorConnection = lazy(() =>
  import("../components/NewInvestor/InvestorConnection/InvestorConnection")
);
const VcProfilePage = lazy(()=>
  import("../pages/VCprofile/VcProfile")
  );
const OtherInvestorProfile = lazy(() =>
  import("../pages/Investor/OtherInvestorProfile/OtherInvestorProfile")
);
const InvestorCompany = lazy(() =>
  import("../pages/Investor/InvestorCompanyProfilePage/InvestorCompany")
);
const EditInvestorCompanyProfilePage = lazy(() =>
  import(
    "../pages/Investor/InvestorCompanyProfilePage/EditInvestorCompanyProfilePage"
  )
);
const News = lazy(() => import("../components/Investor/News/news"))
const InvestorHomeFeed = lazy(() => import("../pages/Investor/Home/Home"));
const NewInvestorManageAccount = lazy(() =>
  import(
    "../components/NewInvestor/InvestorManageAccount/NewInvestorManageAccount"
  )
);
const SavedPosts = lazy(() =>
  import("../pages/Investor/SavedPosts/SavedPosts")
);
const MySchedule = lazy(() =>
  import("../pages/Investor/MySchedule/MySchedule")
);
const SearchResults = lazy(() =>
  import("../pages/Investor/SearchResults/SearchResults")
);
const LiveDeals = lazy(() => import("../pages/Investor/LiveDeals/LiveDeals"));
const Syndicates = lazy(() =>
  import("../pages/Investor/Syndicates/Syndicates")
);
const Explore = lazy(() => import("../pages/Investor/Explore/Explore"));
const InvestorProfile = lazy(() => import("../pages/Investor/Profile/Profile"));
const MyStartUp = lazy(() => import("../pages/Investor/MyStartUp/MyStartUp"));
const Notifications = lazy(() =>
  import("../pages/StartUp/Notifications/Notifications")
);
const InvestorCompanyProfilePage = lazy(() =>
  import(
    "../pages/Investor/InvestorCompanyProfilePage/InvestorCompanyProfilePage"
  )
);
const InvestorOnelink = lazy(() =>
  import("../pages/Investor/InvestorOnelink/InvestorOnelink")
);
const InvestorUserSettings = lazy(() =>
  import("../pages/Investor/InvestorUserSettings/InvestorUserSettings")
);
const InvestorOneLinkEdit = lazy(() =>
  import("../pages/Investor/InvestorOneLinkEdit/InvestorOneLinkEdit")
);

const ProfileInformation = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/ProfileInformation/ProfileInformation"
  )
);

const DarkModeSetting = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/DarkModeSetting/DarkModeSetting"
  )
);

const LanguageSettings = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/LanguageSettings/LanguageSettings"
  )
);

const AutoPlaySettings = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/AutoPlaySettings/AutoPlaySettings"
  )
);

const ContentLanguageSettings = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/ContentLanguageSettings/ContentLanguageSettings"
  )
);

const ManageEmailAddresses = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/ManageEmailAddresses/ManageEmailAddresses"
  )
);

const PhoneNumberSetting = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/PhoneNumberSetting/PhoneNumberSetting"
  )
);

const ChangePassword = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/ChangePassword/ChangePassword"
  )
);

const TwoStepVerification = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/TwoStepVerification/TwoStepVerification"
  )
);

const CloseAccount = lazy(() =>
  import(
    "../pages/StartUp/UserSettings/SettingsPages/CloseAccount/CloseAccount"
  )
);
const MeetingToken = lazy(() => {
	import("../pages/InvestorOneLink/InvestorOneLinkAppointment/MeetingToken");
});

const MeetingEvents = lazy(() =>
	import("../components/Meetings/Events/MeetingEvents")
);
const MeetingPlans = lazy(() =>
	import("../components/Meetings/Plans/MeetingPlans")
);
const MeetingAvailability = lazy(() =>
	import("../components/Meetings/Availability/MeetingAvailability")
);

function InvestorRoutes() {
  return (
    <>
      <Route index element={<Navigate to="profile" replace />} />
      <Route
        path="home"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorHomeFeed />
          </Suspense>
        }
      />

      <Route
      path="post_detail/:postId"
      element={
        <Suspense fallback={<SuspenseLoader />}>
          <InvestorHomeFeed />
        </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorProfile />
          </Suspense>
        }
      />
      <Route
        path="manage-account"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <NewInvestorManageAccount />
          </Suspense>
        }
      />
      <Route
        path="mystartups"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <MyStartUp />
          </Suspense>
        }
      />
      <Route
        path="explore"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Explore />
          </Suspense>
        }
      />
      <Route
        path="syndicates"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Syndicates />
          </Suspense>
        }
      />
      <Route
        path="live-deals"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <LiveDeals />
          </Suspense>
        }
      />
      <Route
        path="news"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <News />
          </Suspense>
        }
      />
      <Route
        path="search"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <SearchResults />
          </Suspense>
        }
      />
      <Route
        path="my-schedule"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <MySchedule />
          </Suspense>
        }
      />
      <Route
        path="saved-posts"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <SavedPosts />
          </Suspense>
        }
      />
      <Route
        path="connection"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorConnection />
          </Suspense>
        }
      />
      <Route
        path="user/:userId"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <OtherInvestorProfile />
          </Suspense>
        }
      />
      <Route
        path="user/:username/:userId"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <OtherInvestorProfile />
          </Suspense>
        }
      />
      <Route
				path="meeting/events"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<MeetingEvents />
					</Suspense>
				}
			/>
			<Route
				path="meeting/plans"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<MeetingPlans />
					</Suspense>
				}
			/>
			<Route
				path="meeting/availability"
				element={
					<Suspense fallback={<SuspenseLoader />}>
						<MeetingAvailability />
					</Suspense>
				}
			/>
      <Route
        path="company-profile/edit"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <EditInvestorCompanyProfilePage />
          </Suspense>
        }
      />
      <Route
        path="company-profile"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorCompany />
          </Suspense>
        }
      />
      <Route
        path="company-profile/:username"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorCompanyProfilePage />
          </Suspense>
        }
      />

      <Route
        path="onelink"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOnelink />
          </Suspense>
        }
      />

      <Route
        path="onelink/edit"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorOneLinkEdit />
          </Suspense>
        }
      />

      <Route
        path="post/:_id"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <SinglePost />
          </Suspense>
        }
      />
       <Route
        path="/investor/vc-profile/:vcId"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <VcProfilePage />
          </Suspense>
        }
      />

      <Route
        path="profile/achievements"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Achievements />
          </Suspense>
        }
      />

      <Route
        path="notifications"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <Notifications />
          </Suspense>
        }
      />

      <Route
        path="settings"
        element={
          <Suspense fallback={<SuspenseLoader />}>
            <InvestorUserSettings />
          </Suspense>
        }
      >
        <Route
          path="profile-information"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <ProfileInformation />
            </Suspense>
          }
        />
        <Route
          path="dark-mode"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <DarkModeSetting />
            </Suspense>
          }
        />
        <Route
          path="language-settings"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <LanguageSettings />
            </Suspense>
          }
        />
        <Route
          path="auto-play-settings"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <AutoPlaySettings />
            </Suspense>
          }
        />
        <Route
          path="content-language-settings"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <ContentLanguageSettings />
            </Suspense>
          }
        />
        <Route
          path="manage-email-addresses"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <ManageEmailAddresses />
            </Suspense>
          }
        />
        <Route
          path="phone-number-setting"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <PhoneNumberSetting />
            </Suspense>
          }
        />
        <Route
          path="change-password"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <ChangePassword />
            </Suspense>
          }
        />
        <Route
          path="two-step-verification"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <TwoStepVerification />
            </Suspense>
          }
        />
        <Route
          path="close-account"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <CloseAccount />
            </Suspense>
          }
        />
      </Route>
    </>
  );
}

export default InvestorRoutes;
