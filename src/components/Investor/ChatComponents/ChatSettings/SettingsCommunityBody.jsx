import React from "react";
import "./SettingsCommunityBody.scss";
import Default from "../../../../Images/avatars/image-4.png";
import { useSelector } from "react-redux";

export default function SettingsCommunityBody() {
  const chatProfile = useSelector((state) => state.chat.chatProfile);
  const communityProfile = useSelector((state) => state.chat.communityProfile);
  const isCommunitySelected = useSelector(
    (state) => state.chat.isCommunitySelected
  );

  return (
    <>
      {isCommunitySelected
        ? sortMembersByAdmin(communityProfile?.community).map((member, index) => (
            <CommunityMemberBar
              key={index}
              member={member}
              adminId={communityProfile.community.adminId}
            />
          ))
        : chatProfile?.communities?.map((community, index) => (
            <CommunityBar key={index} community={community} />
          ))}
    </>
  );
}

// for individual chat profile
const CommunityBar = ({ community }) => {
  return (
    <div className="border-item px-3 py-3 d-flex align-items-center gap-2 ">
      <img
        src={community.profileImage || Default}
        alt="community profile"
        style={{ width: "40px", height: "40px" }}
        className="shadow-sm rounded-circle"
      />
      <div className="d-flex flex-column" style={{ color: "var(--d-l-grey)" }}>
        <p className="m-0" style={{ fontWeight: "500" }}>
          {community.communityName}
        </p>
        <p
          className="m-0 text-clip--25"
          style={{
            fontSize: "12px",
            fontWeight: "400",
          }}
        >
          {community?.members?.map((member) => member.firstName).join(", ")}
        </p>
      </div>
    </div>
  );
};

// for community
const CommunityMemberBar = ({ member, adminId }) => {
  return (
    <div className="border-item px-3 py-3 d-flex align-items-center gap-2 ">
      <img
        src={member.profilePicture || Default}
        alt="profile"
        style={{ width: "40px", height: "40px" }}
        className="shadow-sm rounded-circle"
      />
      <div className="d-flex flex-column" style={{ color: "var(--d-l-grey)" }}>
        <p className="m-0" style={{ fontWeight: "500" }}>
          {member.firstName} {member.lastName}
        </p>
        <p
          className="m-0 text-clip--25"
          style={{
            fontSize: "12px",
            fontWeight: "400",
          }}
        >
          {member._id === adminId ? "Admin" : "Member"}
        </p>
      </div>
    </div>
  );
};

// helper function to sort members by admin
const sortMembersByAdmin = (community) => {
  if (!community || !community.members) return [];
  const { members, adminId } = community;
  const admin = members.find((member) => member._id === adminId);
  const otherMembers = members.filter((member) => member._id !== adminId);
  return admin ? [admin, ...otherMembers] : otherMembers;
};
