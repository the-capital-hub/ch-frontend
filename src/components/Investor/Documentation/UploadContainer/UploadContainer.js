import React, { useRef, useState } from "react";
import "./UploadContainer.scss";
import UploadIcon from "../../../../Images/UploadIcon.svg";
import PDFIcon from "../../../../Images/PDFIcon.png";
import axios from "axios";
import AfterSuccessPopUp from "../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { environment } from "../../../../environments/environment";
import { useSelector } from "react-redux";
import SubcriptionPop from "../../../PopUp/SubscriptionPopUp/SubcriptionPop";

const baseUrl = environment.baseUrl;

const UploadContainer = ({ onClicked }) => {
  const fileInputRef = useRef(null);
  const [isFileOver, setIsFileOver] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const handleClosePopup = () => {
    setShowPopUp(false);
    setThumbnailUrl("");
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsFileOver(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsFileOver(false);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = async (file) => {
    if (file && file.type === "application/pdf") {
      console.log("Uploaded or Dropped PDF file:", file);
      try {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          setThumbnailUrl(PDFIcon);
        };
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Error processing PDF:", error);
        setThumbnailUrl(null);
      }
    } else {
      console.log("Invalid file type. Only PDF files are allowed.");
      setThumbnailUrl(null);
    }
  };

  const handlePdfUploadClick = async () => {
    const file = fileInputRef.current?.files[0];

    if (!file || file.type !== "application/pdf") {
      console.error("The file is not a PDF or no file is selected.");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dndcersc4/raw/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          params: {
            folder: `${process.env.CLOUDINARY_FOLDER}/startUps/logos`,
            resource_type: "raw" // Ensures the file is uploaded as a raw file type
          }
        }
      );

      const requestBody = {
        fileUrl: res.data.secure_url,
        fileName: res.data.original_filename,
        userId: loggedInUser._id,
        folderId: "64dc89095df364b443f04a20",
      };

      await axios
        .post(`${baseUrl}/documentation/uploadDocument`, requestBody)
        .then((response) => {
          if (response.status === 200) {
            setShowPopUp(true);
          }
          const thumbnailUrl = response.data.thumbnailUrl;
          setThumbnailUrl(thumbnailUrl);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } catch (error) {
      console.error("Error processing PDF:", error);
      setThumbnailUrl(null);
    }
  };

  const containerStyle = isFileOver
    ? { border: "2px dashed #ccc", backgroundColor: "#f9f9f9" }
    : {};

  return (
    <>
      {thumbnailUrl ? (
        <div
          onClick={() => onClicked(true)}
          className="upload_container"
          style={containerStyle}
        >
          <div className="image_container">
            <img src={PDFIcon} alt="Uploaded Thumbnail" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handleFileInputChange}
          />
          <p className="text text_upload" onClick={handlePdfUploadClick}>
            Click here to upload this pdf
          </p>
        </div>
      ) : (
        <div
          onClick={() => onClicked(true)}
          className="upload_container"
          style={containerStyle}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="image_container">
            <img src={UploadIcon} alt="Upload Icon" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            accept="application/pdf"
            onChange={handleFileInputChange}
          />
          <p className="text">Click to upload</p>
        </div>
      )}
      {showPopUp && (
        <AfterSuccessPopUp savedFile={true} onClose={handleClosePopup} />
      )}
      {popPayOpen && (
        <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
      )}
    </>
  );
};

export default UploadContainer;