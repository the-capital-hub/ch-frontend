import React from "react";

export default function VideoAttachment({
  selectedVideo,
  removeSelectedVideo,
}) {
  return (
    <>
      {selectedVideo && (
        <div className="video-preview">
          <video controls width={200}>
            <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="remove-preview" onClick={removeSelectedVideo}>
            X
          </button>
        </div>
      )}
    </>
  );
}
