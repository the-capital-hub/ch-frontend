import React, { useEffect, useState } from "react";
import "./HalfbendCard.scss";
import { BiSolidFilePdf } from "react-icons/bi";
import { getPdfData, deleteDocument } from "../../../../../Service/user";
import { useSelector } from "react-redux";
import { MdDelete, MdClose } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import AfterSuccessPopup from "../../../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";

const VideoModal = ({ videoUrl, onClose }) => {
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  
  return (
    <div className="video-modal-overlay">
      <div className="video-modal-content">
        <button className="video-modal-close" onClick={onClose}>
          <MdClose size={30} color="#fff" />
        </button>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const HalfbendCard = ({ folderName, userId }) => {
  const [data, setData] = useState([]);
  const [deleteDoc, setDeleteDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = userId
          ? await getPdfData(userId, folderName)
          : await getPdfData(loggedInUser?.oneLinkId, folderName);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loggedInUser, userId, folderName, deleteDoc]);

  const openFileInNewWindow = (fileUrl) => {
    const newWindow = window.open();
    newWindow.location = fileUrl;
  };

  const handleDeleteDoc = (id) => {
    try {
      deleteDocument(id).then(() => setDeleteDoc(true));
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  const renderFileIcon = (fileType, fileUrl) => {
    switch (fileType) {
      case 'pdf':
        return <BiSolidFilePdf size={100} color="#f34646" cursor="pointer" />;
      case 'image':
        return <img src={fileUrl} alt="Preview" className="file-preview" />;
      default:
        return <FaFileAlt size={100} color="#f34646" cursor="pointer" />;
    }
  };

  const renderVideo = (videoUrl, thumbnailUrl) => {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    if (videoId) {
      return (
        <div
          className="video-thumbnail-container"
          onClick={() => {setSelectedVideo(videoUrl)}}
          style={{ cursor: "pointer" }}
        >
          <img
            src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/0.jpg`}
            alt="Video Thumbnail"
            className="video-thumbnail"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="half_bend_container row rowWidth">
      <div className="box_container mt-4">
        <div className="row rowWidth">
          {loading && (
            <SpinnerBS
              className="d-flex py-5 justify-content-center align-items-center w-100"
            />
          )}

          {!loading &&
            data?.map((item) => {
              const fileNameParts = item.fileName.split('_');
              const displayedFileName = fileNameParts[fileNameParts.length - 1];
              const fileType = item.fileName.split('.').pop().toLowerCase();

              let class_name;
              let custom_card_class_name;
              if(item.videoUrl){
                class_name="d-flex mx-auto hidden"
                custom_card_class_name = "custom-card hidden"
              }
              else{
                class_name="d-flex mx-auto"
                custom_card_class_name= "custom-card"
              }

              return (
                <div
                  className={`col-md-4 d-flex justify-content-center align-items-center main_col ${folderName === 'onelinkpitch' ? 'video_card' : 'pdf_card'}`}
                  key={item.fileName}
                  style={{width: "100%", padding: "1rem" }}
                >
                  <div className={custom_card_class_name} style={{ width: "100%" }}>
                    {/* If videoUrl exists, render thumbnail and set iframe on click */}
                    {item.videoUrl ? (
                      renderVideo(item.videoUrl, item.fileUrl)
                    ) : (
                      <div
                        className="pdf-icon-button"
                        onClick={() => openFileInNewWindow(item.fileUrl)}
                      >
                        {renderFileIcon(fileType, item.fileUrl)}
                      </div>
                    )}
                    <div
                      className={class_name}
                      style={{
                        alignItems: "center",
                        padding: "0.5rem 0",
                        justifyContent: "space-between",
                      }}
                    >
                   {!item.videoUrl && (
                                  fileType === 'pdf' ? (
                                    <>
                                      <BiSolidFilePdf size={20} color="#f34646" />
                                      <h6 style={{ marginBottom: 0 }}>{displayedFileName}</h6>
                                    </>
                                  ) : (
                                    <>
                                      <FaFileAlt size={20} color="#f34646" />
                                      <h6 style={{ marginBottom: 0 }}>{displayedFileName}</h6>
                                    </>
                                  )
                                )}

                      {loggedInUser?._id === item.userId &&
                        window.location.href.split("/")[3] === "documentation" && ( item.videoUrl ? (<div style={{ margin:"auto"
                        }}>
                          <MdDelete
                            size={25}
                            color="#f34646"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteDoc(item._id)}
                          />
                          </div>) : (<MdDelete
                            size={20}
                            color="#f34646"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteDoc(item._id)}
                          />)
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {deleteDoc && (
        <AfterSuccessPopup
          withoutOkButton
          onClose={() => setDeleteDoc(false)}
          successText="Document Deleted Successfully"
        />
      )}

      {selectedVideo && (
        <VideoModal 
          videoUrl={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default HalfbendCard;