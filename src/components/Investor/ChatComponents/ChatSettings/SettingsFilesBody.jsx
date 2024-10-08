import React from "react";
import IconFile from "../../SvgIcons/IconFile";
import IconVideo from "../../SvgIcons/IconVideo";
import IconChevronRight from "../../SvgIcons/IconChevronRight";
import { useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";

export default function SettingsFilesBody() {
  const chatProfile = useSelector((state) => state.chat.chatProfile);
  const communityProfile = useSelector((state) => state.chat.communityProfile);
  const isCommunitySelected = useSelector(
    (state) => state.chat.isCommunitySelected
  );

  return (
    <>
      <FileBar
        fileType="documents"
        fileCount={
          isCommunitySelected
            ? communityProfile?.documents?.length
            : chatProfile?.documents?.length
        }
      >
        <IconFile color={"black"} />
      </FileBar>
      <FileBar
        fileType="videos"
        fileCount={
          isCommunitySelected
            ? communityProfile?.videos?.length
            : chatProfile?.videos?.length
        }
      >
        <IconVideo color={"black"} />
      </FileBar>
      <FileBar
        fileType="images"
        fileCount={
          isCommunitySelected
            ? communityProfile?.images?.length
            : chatProfile?.images?.length
        }
      >
        <HiOutlineCamera size={25} color={"black"} />
      </FileBar>
    </>
  );
}

// File Bar component
const FileBar = ({ children, fileType, fileCount }) => (
  <div className="d-flex gap-2">
    <div className="px-3 py-3 d-flex align-items-center gap-2 w-100 ">
      <div
        className="bg-white rounded-4 d-flex justify-content-center align-items-center"
        style={{ width: "40px", height: "40px" }}
      >
        {children}
      </div>
      <div className="d-flex flex-column">
        <p
          className="m-0 text-capitalize"
          style={{ fontWeight: "500", color: "var(--d-l-grey)" }}
        >
          {fileType}
        </p>
        <p
          className="m-0"
          style={{
            fontSize: "12px",
            fontWeight: "400",
            color: "rgba(159, 159, 159, 1)",
          }}
        >
          {fileCount} Files
        </p>
      </div>
      <div className="ms-auto align-self-start">
        <IconChevronRight color={"var(--d-l-grey)"} />
      </div>
    </div>
  </div>
);
