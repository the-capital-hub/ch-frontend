import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import "./UserSettings.scss";
import SettingsTabs from "../../../components/Investor/UserSettingsPageComponents/SettingsTabs/SettingsTabs";
import Account from "../../../components/Investor/UserSettingsPageComponents/Account/Account";
import SignInAndSecurity from "../../../components/Investor/UserSettingsPageComponents/SignInAndSecurity/SignInAndSecurity";
import PrivacyPolicy from "../../../components/Investor/UserSettingsPageComponents/PrivacyPolicy/PrivacyPolicy";
import Logout from "../../../components/Investor/UserSettingsPageComponents/Logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsMobileView,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
// import IconChevronBack from "../../../components/Investor/SvgIcons/IconChevronBack";
import { Outlet, useLocation } from "react-router-dom";

export default function UserSettings() {
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

  const SETTINGS_CONTENT = {
    account: <Account setActiveTab={setActiveTab} />,
    signInAndSecurity: <SignInAndSecurity setActiveTab={setActiveTab} />,
    privacyPolicy: <PrivacyPolicy setActiveTab={setActiveTab} />,
    logout: <Logout setActiveTab={setActiveTab} />,
  };

  return (
    <div className="userSettings-page-wrapper mx-lg-3">
      <MaxWidthWrapper>
        {/* Mobile View */}
        {isMobileView && (
          <>
            <div className="userSettings-page-container d-flex flex-column gap-3">
              {!activeTab && pathname === "/settings" && (
                <div className="z-0" id="sidebarSettings">
                  <SettingsTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )}

              {/* Settings Content */}
              {activeTab && pathname === "/settings" && (
                <div
                  className="setttings-content flex-grow-1"
                  id="settingsContent"
                >
                  {/* <button
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
                  </button> */}
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
            <div className="userSettings-page-container d-flex flex-column flex-lg-row gap-3">
              <div className="z-0" id="sidebarSettings">
                <SettingsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>

              {/* Settings Content */}
              {pathname === "/settings" && (
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
