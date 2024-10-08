import { useEffect, useState } from "react";
import "./InvestorUserSettings.scss";
import {
  selectIsMobileView,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SettingsTabs from "../../../components/Investor/UserSettingsPageComponents/SettingsTabs/SettingsTabs";
import IconChevronBack from "../../../components/Investor/SvgIcons/IconChevronBack";
import Account from "../../../components/Investor/UserSettingsPageComponents/Account/Account";
import SignInAndSecurity from "../../../components/Investor/UserSettingsPageComponents/SignInAndSecurity/SignInAndSecurity";
import PrivacyPolicy from "../../../components/Investor/UserSettingsPageComponents/PrivacyPolicy/PrivacyPolicy";
import Logout from "../../../components/Investor/UserSettingsPageComponents/Logout/Logout";

// If settings content is different for Investor Account, create a separate component for it
const SETTINGS_CONTENT = {
  account: <Account />,
  signInAndSecurity: <SignInAndSecurity />,
  privacyPolicy: <PrivacyPolicy />,
  logout: <Logout />,
};

export default function InvestorUserSettings() {
  const isMobileView = useSelector(selectIsMobileView);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    document.title = "Settings | The Capital Hub";
    dispatch(setPageTitle("Settings"));
  }, [dispatch]);

  useEffect(() => {
    if (isMobileView) {
      setActiveTab(null);
    } else {
      setActiveTab("account");
    }
  }, [isMobileView]);

  return (
    <div className="investor-userSettings-page-wrapper mt-3 mb-5 mx-lg-3">
      <MaxWidthWrapper>
        {/* Mobile View */}
        {isMobileView && (
          <>
            <div className="investor-userSettings-page-container d-flex flex-column gap-3">
              {!activeTab && pathname === "/investor/settings" && (
                <div className="z-0" id="sidebarSettings">
                  <SettingsTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )}

              {/* Settings Content */}
              {activeTab && pathname === "/investor/settings" && (
                <div
                  className="setttings-content flex-grow-1"
                  id="settingsContent"
                >
                  <button
                    type="button"
                    className="btn btn-secondary p-0 mb-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "45px", height: "45px" }}
                    onClick={() => setActiveTab(null)}
                  >
                    <IconChevronBack
                      height={30}
                      width={30}
                      style={{ marginLeft: "-4px" }}
                    />
                  </button>
                  {SETTINGS_CONTENT[activeTab]}
                </div>
              )}

              {/* outlet */}
              <Outlet />
            </div>
          </>
        )}

        {/* Large Screen View */}
        {!isMobileView && (
          <>
            <div className="investor-userSettings-page-container d-flex flex-column flex-lg-row gap-3">
              <div className="z-0" id="sidebarSettings">
                <SettingsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>

              {/* Settings Content */}
              {pathname === "/investor/settings" && (
                <div
                  className="setttings-content flex-grow-1"
                  id="settingsContent"
                >
                  {SETTINGS_CONTENT[activeTab]}
                </div>
              )}

              {/* outlet */}
              <Outlet />
            </div>
          </>
        )}
      </MaxWidthWrapper>
    </div>
  );
}
