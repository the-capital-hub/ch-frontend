import React, { useEffect, useRef, useState } from "react";
import "./createpostpopup.scss";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { BsLink45Deg } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePostAPI,
  postUserPost,
  getStartupByFounderId,
  updateUserById,
  addNotificationAPI,
} from "../../../Service/user";
import { getBase64 } from "../../../utils/getBase64";
import FeedPostCard from "../../Investor/Cards/FeedPost/FeedPostCard";
import EasyCrop from "react-easy-crop";
import { s3 } from "../../../Service/awsConfig";
import { toggleCreatePostModal, selectTheme } from "../../../Store/features/design/designSlice";
import toast from "react-hot-toast";
import { loginSuccess } from "../../../Store/features/user/userSlice";
import IconFile from "../../Investor/SvgIcons/IconFile";

//pdfjs
// import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
// GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`;


const CreatePostPopUp = ({
  setPopupOpen,
  popupOpen,
  setNewPost,
  respostingPostId,
  appendDataToAllPosts,
}) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postType, setPostType] = useState("public");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [pdfThumbnail, setPdfThumbnail] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const handleClose = () => {
    setPopupOpen(false);
    dispatch(toggleCreatePostModal());
  };

  const galleryInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleGalleryButtonClick = () => {
    galleryInputRef.current.click();
  };

  const handleDocumentButtonClick = () => {
    documentInputRef.current.click();
  };

  const handleCameraButtonClick = () => {
    cameraInputRef.current.click();
  };

  const [cropComplete, setCropComplete] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewVideoType, setPreviewVideoType] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);

    if (event.target.name === "image" && file.type.includes("image")) {
      setPreviewImage(objectUrl);
      setSelectedImage(file);
      setSelectedVideo(null);
      setCroppedImage(null);
      // setPdfThumbnail(null);
    } else if (event.target.name === "video" && file.type.includes("video")) {
      setPreviewVideoType(file.type);
      setPreviewVideo(objectUrl);
      setSelectedVideo(file);
      setSelectedImage(null);
      // setPdfThumbnail(null); 
    } else if (event.target.name === "document") {
      setSelectedDocument(file);
      setSelectedImage(null);
      setSelectedVideo(null);
      // await renderPdfThumbnail(file);
    }
  };

  //  const renderPdfThumbnail = async (file) => {
  //   const fileUrl = URL.createObjectURL(file);
  //   const loadingTask = getDocument(fileUrl);
  //   const pdf = await loadingTask.promise;
  //   const page = await pdf.getPage(1);
  //   const viewport = page.getViewport({ scale: 1 });
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //   canvas.width = viewport.width;
  //   canvas.height = viewport.height;

  //   const renderContext = {
  //     canvasContext: context,
  //     viewport: viewport,
  //   };
  //   await page.render(renderContext).promise;

  //   const dataUrl = canvas.toDataURL();
  //   setPdfThumbnail(dataUrl);
  //   URL.revokeObjectURL(fileUrl); // Clean up
  // };

  const handleOneLinkClick = () => {
    getStartupByFounderId(loggedInUser._id)
      .then(({ data }) => {
        setPostText(
          (prevPostText) =>
            prevPostText +
            ` https://thecapitalhub.in/onelink/${data.oneLink}/${loggedInUser.oneLinkId}`
        );
      })
      .catch((error) => console.log(error));
  };

  const handleQuillChange = (value) => {
    setPostText(value);
  };

  const getCroppedImg = async (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = crop.width;
    canvas.height = crop.height;
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to crop image"));
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        },
        "image/jpeg",
        1
      );
    });
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const croppedImg = await getCroppedImg(previewImage, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);

    if (!selectedImage && !selectedVideo) {
      if (!respostingPostId && !postText) {
        return setPosting(false);
      }
    }

    const postData = new FormData();
    if (respostingPostId) {
      postData.append("resharedPostId", respostingPostId);
    }
    postData.append("description", postText);
    postData.append("category", category);

    if (selectedImage) {
      postData.append("image", croppedImage);
    }
    if (selectedVideo) {
      const video = await getBase64(selectedVideo);
      postData.append("video", video);
    }
    if (selectedDocument) {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${selectedDocument.name}`;
      const params = {
        Bucket: "thecapitalhubwebsitedocuments",
        Key: `documents/${fileName}`,
        Body: selectedDocument,
      };
      const res = await s3.upload(params).promise();
      postData.append("documentUrl", res.Location);
      postData.append("documentName", selectedDocument.name);
      // setPostText(
      //   (prevPostText) =>
      //     prevPostText +
      //     res.Location
      // );
      postData.append("image",res.Location);
      // postData.append("images", pdfThumbnail)
    }
    postData.append("postType", postType);

    try {
      const response = await postUserPost(postData);
      console.log("pdfThumbnail",response.data);
      const newPosts = Array.isArray(response.data) ? response.data : [response.data];
      appendDataToAllPosts(newPosts);
      setPostText("");
      setSelectedImage(null);
      setSelectedVideo(null);
      setSelectedDocument(null);
      setCroppedImage(null);
     //  setPdfThumbnail(null);
      setNewPost(Math.random());
      handleClose();
      dispatch(toggleCreatePostModal());
   

      if (!loggedInUser.achievements.includes("6564684649186bca517cd0c9")) {
        const achievements = [...loggedInUser.achievements];
        achievements.push("6564684649186bca517cd0c9");
        const updatedData = { achievements };
        const { data } = await updateUserById(loggedInUser._id, updatedData);
        dispatch(loginSuccess(data.data));
        const notificationBody = {
          recipient: loggedInUser._id,
          type: "achievementCompleted",
          achievementId: "6564684649186bca517cd0c9",
        };
        await addNotificationAPI(notificationBody);
        console.log("Added");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setPosting(false);
    }
  };

  const [repostingPostData, setRepostingPostData] = useState(null);
  const [loadingRepostData, setLoadingRepostData] = useState(false);

  useEffect(() => {
    if (respostingPostId) {
      setLoadingRepostData(true);
      getSinglePostAPI(respostingPostId)
        .then(({ data }) => {
          setRepostingPostData(data);
          setLoadingRepostData(false);
        })
        .catch(() => handleClose());
    }
  }, [respostingPostId]);

  return (
    <>
      {popupOpen && <div className="createpost-background-overlay"></div>}
      <div
        className={`create_post_modal rounded-4 p-md-2 ${
          popupOpen ? "d-block" : ""
        }`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="createpost_modal-header">
              <div className="createpostpopup">
                <div className="ceatepost_img_name">
                  <img
                    src={loggedInUser.profilePicture}
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                    className="rounded-circle"
                    alt="profile pic"
                  />
                  <span>
                    <h2>
                      {loggedInUser?.firstName} {loggedInUser.lastName}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        width: "110px",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6
                        className=""
                        style={{
                          backgroundColor: postType === "public" && "#fd5901",
                          color: postType === "public" ? "#fff" : "grey",
                          padding: "1px 2px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                        onClick={() => setPostType("public")}
                      >
                        Public
                      </h6>
                      <h6
                        style={{
                          backgroundColor:
                            postType === "company" && "rgb(211, 243, 107)",
                          color: postType === "company" ? "#000" : "grey",
                          padding: "1px 2px",
                          borderRadius: "2px",
                          cursor: "pointer",
                        }}
                        onClick={() => setPostType("company")}
                      >
                        Company
                      </h6>
                    </div>
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="close d-flex justify-content-end"
                  onClick={handleClose}
                  style={{ background: "transparent", border: "none" }}
                >
                  <h3 aria-hidden="true" className="m-3">
                    &times;
                  </h3>
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="createpost_text_area">
              <ReactQuill
                value={postText}
                onChange={handleQuillChange}
                placeholder="What would you like to converse about? Write a post..."
                modules={{ toolbar: false }} // Hide the toolbar
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                  "image",
                  "video",
                ]}
                style={{
                  height: respostingPostId ? "100px" : "200px",
                  color: theme === "dark" ? "white" : "black",
                  border: "none",
                  overflowY: "auto",
                }}
                className="custom-scrollbar"
              />
                {respostingPostId &&
                  (loadingRepostData ? (
                    <div className="d-flex justify-content-center my-4">
                      <h6 className="h6 me-4">Loading post...</h6>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <FeedPostCard
                      repostPreview
                      userId={repostingPostData?.user?._id}
                      postId={repostingPostData?._id}
                      designation={repostingPostData?.user?.designation}
                      profilePicture={repostingPostData?.user?.profilePicture}
                      description={repostingPostData?.description}
                      firstName={repostingPostData?.user?.firstName}
                      lastName={repostingPostData?.user?.lastName}
                      video={repostingPostData?.video}
                      image={repostingPostData?.image}
                      createdAt={repostingPostData?.createdAt}
                      likes={repostingPostData?.likes}
                    />
                  ))}
              </div>

              
            </div>

            {previewImage && !cropComplete && (
                <div className="d-flex flex-column justify-content-center gap-2">
                  <div className="image-cropper">
                    <EasyCrop
                      image={previewImage}
                      crop={crop}
                      zoom={zoom}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => setCropComplete(true)}
                  >
                    Crop
                  </button>
                </div>
              )}
              {cropComplete && (
                <div className="cropped-preview w-100 d-flex justify-content-center">
                  <img
                    src={croppedImage}
                    alt="cropped post"
                    className=""
                    style={{
                      maxHeight: "30vh",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              {previewVideo && (
                <video
                  key={selectedVideo ? selectedVideo.name : ""}
                  controls
                  width={"100%"}
                >
                  <source src={previewVideo} type={previewVideoType} />
                  Your browser does not support the video tag.
                </video>
              )}

              {pdfThumbnail && (
                <div className="pdf-thumbnail">
                  <img
                    src={pdfThumbnail}
                    alt="PDF Thumbnail"
                    style={{ maxHeight: "30vh", width: "auto" }}
                  />
                </div>
              )}

              {(selectedDocument && !pdfThumbnail) && (
                <p>Selected File: {selectedDocument.name}</p>
              )}

            <div className="createpost_modal_footer">
              <div className="modal_footer_container mt-4 mb-3">
                <div className="left_buttons">
                  <input
                    type="file"
                    name="image"
                    style={{ display: "none" }}
                    ref={galleryInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <button
                    className="white_button hover-text"
                    onClick={handleGalleryButtonClick}
                  >
                    <CiImageOn
                      size={25}
                      style={{ color: "var(--d-l-grey)" }}
                    />
                    <span className="tooltip-text top">images</span>
                  </button>

                  <input
                    type="file"
                    name="video"
                    style={{ display: "none" }}
                    ref={cameraInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                  />
                  <button
                    className="white_button hover-text"
                    onClick={handleCameraButtonClick}
                  >
                    <CiVideoOn
                      size={25}
                      style={{ color: "var(--d-l-grey)" }}
                    />
                    <span className="tooltip-text top1">video</span>
                  </button>

                  <input
                    type="file"
                    name="document"
                    style={{ display: "none" }}
                    ref={documentInputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    className="white_button hover-text"
                    onClick={handleDocumentButtonClick}
                  >
                    <IconFile
                      width="16px"
                      height="16px"
                      style={{ color: "var(--d-l-grey)" }}
                    />
                    <span className="tooltip-text top2">doc</span>
                  </button>

                  {/* <button
                    className="white_button hover-text"
                    onClick={handleOneLinkClick}
                  >
                    <BsLink45Deg
                      height={"59px"}
                      width={"59px"}
                      size={"20px"}
                      style={{ color: "var(--d-l-grey)" }}
                    />
                    <span className="tooltip-text top3">link</span>
                  </button> */}
                </div>
                <div className="post_button_container">
                  {posting ? (
                    <button className="post_button" disabled>
                      Posting...
                    </button>
                  ) : (
                    <button className="post_button" onClick={handleSubmit}>
                      Post
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostPopUp;
