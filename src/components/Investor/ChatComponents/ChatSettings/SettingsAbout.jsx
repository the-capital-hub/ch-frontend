import React from "react";
import IconInfoCircle from "../../SvgIcons/IconInfoCircle";
import { useSelector } from "react-redux";
import IconEdit from "../../SvgIcons/IconEdit";

export default function SettingsAbout() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const chatProfile = useSelector((state) => state.chat.chatProfile);
  const communityProfile = useSelector((state) => state.chat.communityProfile);
  const isCommunitySelected = useSelector(
    (state) => state.chat.isCommunitySelected
  );

  return (
    <div className="settings_about d-flex flex-column gap-1 py-3 border-bottom">
      <div className="d-flex gap-1 align-items-center">
        <IconInfoCircle color={"var(--d-l-grey)"} />
        <p
          style={{
            color: "var(--d-l-grey)",
            fontSize: "12px",
            fontWeight: "500",
          }}
          className="m-0"
        >
          ABOUT
        </p>
        {/* Edit button - Show only to admin */}
        {isCommunitySelected &&
          communityProfile?.community?.adminId === loggedInUser._id && (
            <button
              className="btn bg-transparent text-capitalize border-0 p-0 ms-auto"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#chatSettingsOffcanvas"
              ariaControls="chatSettingsOffcanvas"
            >
              <IconEdit />
            </button>
          )}
      </div>

      <p
        className="m-0"
        style={{
          fontWeight: "400",
          fontSize: "16px",
          color: "var(--d-l-grey)",
        }}
      >
        {communityProfile?.community?.about}

        {isCommunitySelected ? "" : chatProfile?.user?.bio || "No About"}
      </p>
    </div>
  );
}
