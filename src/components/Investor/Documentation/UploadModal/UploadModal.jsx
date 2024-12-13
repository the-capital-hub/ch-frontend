import { useState, useRef, useEffect } from "react";
import "./UploadModal.scss";
import axios from "axios";
import { environment } from "../../../../environments/environment";
import AfterSuccessPopUp from "../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { useSelector } from "react-redux";
import IconDelete from "../../SvgIcons/IconDelete";
import { getFoldersApi, addNotificationAPI } from "../../../../Service/user";
import { selectTheme } from "../../../../Store/features/design/designSlice";

const baseUrl = environment.baseUrl;

const UploadModal = ({ onCancel, fetchFolder, notify }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const theme = useSelector(selectTheme);
  const [folder, setFolder] = useState("pitchdeck");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const fileInputRef = useRef(null);

  const [folderName, setFolderName] = useState("");
  const [folderSelector, setFolderSelector] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");  // State for pitch video URL

  useEffect(() => {
    const getFolders = () => {
      getFoldersApi(loggedInUser.oneLinkId)
        .then((data) => {
          console.log("folders",data);
          const folders = data.data;
          folders.push("New Folder");
          setFolderSelector(folders);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getFolders();

  }, [loggedInUser.oneLinkId]);

  const handleClosePopup = () => {
    setShowPopUp(false);
    onCancel(false);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = [...e.target.files];
    const filteredFiles = selectedFiles.filter(file => {
      if (file.size > 20 * 1024 * 1024) { // 20MB in bytes
        alert(`File ${file.name} exceeds 20MB. Please select a smaller file.`);
        return false;
      }
      return true;
    });

    setFiles([...files, ...filteredFiles]);
  };

  const handleRemoveFile = (index) => {
    const filesCopy = [...files];
    filesCopy.splice(index, 1);
    setFiles(filesCopy);
  };

  const handlePdfUploadClick = async () => {
    if (files.length === 0) {
      return;
    }
  
    setLoading(true);
  
    const getAuthToken = () => {
      return localStorage.getItem("accessToken");
    };
  
    // Iterate over files and upload them one by one
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("userId", loggedInUser._id);
      formData.append("folderName", folder === "New Folder" ? folderName : folder);
  
      // If folder is 'onelinkpitch', append videoUrl
      if (folder === "onelinkpitch" && videoUrl) {
        formData.append("videoUrl", videoUrl);
      }
  
      formData.append("file", files[i]);
  
      try {
        const response = await axios.post(
          `${baseUrl}/documentation/uploadDocument`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            },
          }
        );
  
        console.log("File uploaded:", response.data);
  
      } catch (error) {
        console.error("Error uploading file to backend:", error);
        alert(`Failed to upload file: ${files[i].name}`);
        break;
      }
    }
  
    // After all files are uploaded
    setLoading(false);
    setShowPopUp(true);
    setFiles([]);
    setVideoUrl(""); // Reset the video URL after upload
  };
  

  const renderFileList = () => (
    <ol className="list-group list-group-numbered">
      {[...files].map((file, index) => (
        <div
          role="button"
          className="list-group-item list-group-item-action file_list_button d-flex align-items-center"
          key={index}
        >
          <p className="text-start uploaded_file_name m-0 lh-1">{file.name}</p>
          <button
            type="button"
            className="btn border-0 ms-auto m-0 p-0"
            onClick={() => handleRemoveFile(index)}
          >
            <IconDelete />
          </button>
        </div>
      ))}
    </ol>
  );

  return (
    <div className="uploadModal">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="modalcontainer">
        <div className="modalwrapper">
          <h1>Select your folder</h1>
          <div style={{ paddingRight: "10px", backgroundColor: theme === "dark" ? "#121212" : "#e9ecef", borderRadius: "5px" }}>
            <select
              onChange={(e) => setFolder(e.target.value)}
              name="Folder"
              id=""
              style={{ border: "none", backgroundColor: theme === "dark" ? "#121212" : "#e9ecef" }}
            >
              {/* <option value="pitchdeck">Pitch Deck</option>
              <option value="business">Business</option>
              <option value="kycdetails">KYC Details</option>
              <option value="legal and compliance">Legal and Compliance</option>
              <option value="onelinkpitch">OneLink Pitch</option>
              <option value="New Folder">Other</option> */}
               {    folderSelector.map((folderOption, index) => (
                      <option key={index} value={folderOption}>
                        {
                          folderOption === "pitchdeck" ? "Pitch Deck" :
                          folderOption === "business" ? "Business" :
                          folderOption === "kycdetails" ? "KYC Details" :
                          folderOption === "legal and compliance" ? "Legal and Compliance" :
                          folderOption === "onelinkpitch" ? "OneLink Pitch" : 
                          folderOption 
                        }
                      </option>
                                                                  ))}
            </select>
          </div>

          {folder === "New Folder" && (
            <input
              className="name_input rounded-pill px-3 py-2"
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          )}

          {folder === "onelinkpitch" && (
            <input
              className="name_input rounded-pill px-3 py-2 mt-3"
              type="url"
              placeholder="Pitch video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          )}

          {folder && (
            <>
              <div className="position-relative d-flex flex-column flex-lg-row align-items-center">
                <div className="">
                  <input
                    type="file"
                    id="files"
                    ref={fileInputRef}
                    multiple
                    accept=".txt, .png, .jpg, .jpeg, .pdf, .pdfxml, .docx, .xlsx"
                    onChange={handleFileSelect}
                    className="visually-hidden"
                  />
                  {/* Change label text based on selected folder */}
                  <label htmlFor="files" className="doc_upload_label">
                    {folder === "onelinkpitch" ? "Select Thumbnail" : "Select Files"}
                  </label>
                </div>
                {files.length !== 0 && (
                  <pre className="ms-lg-3 mt-3 mt-lg-0">{renderFileList()}</pre>
                )}
              </div>
              <button className="upload_button" onClick={handlePdfUploadClick}>
                Upload
              </button>
            </>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div
              className="progress"
              role="progressbar"
              aria-label="Upload Progress"
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar bg_orange" style={{ width: `${uploadProgress}%` }}>
                {uploadProgress}% Complete
              </div>
            </div>
          )}

          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPopUp && (
        <AfterSuccessPopUp savedFile={true} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UploadModal;
