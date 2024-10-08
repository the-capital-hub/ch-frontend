import React, { useEffect, useState } from "react";
import "./HalfbendCard.scss";
import { BiSolidFilePdf } from "react-icons/bi";
import { getPdfData, deleteDocument } from "../../../../../Service/user";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaFileImage, FaFileAlt } from "react-icons/fa";
import AfterSuccessPopup from "../../../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";

const HalfbendCard = ({ folderName, userId }) => {
  const [data, setData] = useState([]);
  const [deleteDoc, setDeleteDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    setLoading(true);
    if (userId !== undefined) {
      getPdfData(userId, folderName)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error.message);
        });
    } else {
      getPdfData(loggedInUser?.oneLinkId, folderName)
        .then((res) => {
          setData(res.data);
          console.log(data, "MainData");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error.message);
        });
    }
  }, [loggedInUser, userId, folderName, deleteDoc]);

  const openFileInNewWindow = (fileUrl) => {
    let newWindow = window.open();
    newWindow.location = fileUrl;
  };

  const handleDeleteDoc = (id) => {
    try {
      deleteDocument(id).then((res) => {
        console.log(res);
        setDeleteDoc(true);
      });
    } catch (error) {
      console.log("Error in delete document:", error.response.data.message);
    }
  };

  const renderFileIcon = (fileType, fileUrl) => {
    switch (fileType) {
      case 'pdf':
        return <BiSolidFilePdf size={100} color="#f34646" cursor={"pointer"} />;
      case 'image':
        return <img src={fileUrl} alt="Preview" className="file-preview" />;
      default:
        return <FaFileAlt size={100} color="#f34646" cursor={"pointer"} />;
    }
  };

  return (
    <div className="half_bend_container row">
      <div className="box_container mt-4">
        <div className="row">
          {loading && (
            <SpinnerBS
              className="d-flex py-5 justify-content-center align-items-center w-100"
            />
          )}

          {!loading &&
            data?.map((item, index) => {
              const fileNameParts = item.fileName.split('_');
              const displayedFileName = fileNameParts[fileNameParts.length - 1];
              const fileType = item.fileName.split('.').pop().toLowerCase();
              
              return (
                <div
                  className="col-md-4 d-flex justify-content-center align-items-center main_col"
                  key={item.fileName}
                  style={{ maxWidth: "300px", width: "100%", padding: "1rem" }}
                >
                  <div className="custom-card" style={{ width: "100%" }}>
                    <div
                      className="pdf-icon-button"
                      onClick={() => openFileInNewWindow(item.fileUrl)}
                    >
                      {renderFileIcon(fileType, item.fileUrl)}
                    </div>
                    <div
                      className="d-flex mx-auto"
                      style={{
                        alignItems: "center",
                        padding: "0.5rem 0",
                        justifyContent: "space-between",
                      }}
                    >
                      {fileType === 'pdf' ? (
                        <BiSolidFilePdf size={20} color="#f34646" />
                      ) : (
                        <FaFileAlt size={20} color="#f34646" />
                      )}
                      <h6 style={{ marginBottom: 0 }}>{displayedFileName}</h6>
                      {loggedInUser?._id === item.userId &&
                        window.location.href.split("/")[3] === "documentation" && (
                          <MdDelete
                            size={20}
                            color="#f34646"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteDoc(item._id)}
                          />
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
          onClose={() => setDeleteDoc(!deleteDoc)}
          successText="Document Deleted Successfully"
        />
      )}
    </div>
  );
};

export default HalfbendCard;
