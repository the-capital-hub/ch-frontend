import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./articlePopup.scss";
import axios from "axios";
import { environment } from "../../../environments/environment";
import { addArticle } from "../../../Service/user";

const ArticlePopup = ({ setArticlePopup, articlePopup }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [content, setValue] = useState("");
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: () => fileInputRef.current.click()
      }
    }
  };
  const handleMemo = useMemo(
    (content, delta, source, editor) => setValue(content),
    [content]
);
  const handleImageUpload = async () => {
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files[0]) {
      const file = fileInput.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "fiverr");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dndcersc4/upload",
          data,
          { withCredentials: false }
        );

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
          quill.insertEmbed(range.index, 'image', res.data.url);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const quill = quillRef.current.getEditor();
    const content = quill.root.innerHTML;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const images = tempDiv.querySelectorAll('img');

    const imageUploadPromises = Array.from(images).map(async (img) => {
      if (img.src.startsWith('data:')) {
        const file = dataURLToFile(img.src, 'image.png');
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'fiverr');

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dndcersc4/upload',
          data,
          { withCredentials: false }
        );

        img.src = res.data.url;
      }
    });

    try {
      await Promise.all(imageUploadPromises);
      const updatedContent = tempDiv.innerHTML;
      const response = await addArticle(updatedContent);
      
      console.log("Updated Content:", response);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const dataURLToFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      {articlePopup && <div className="createpost-background-overlay"></div>}
      <div
        className={`create_post_modal rounded-4 p-md-2 ${articlePopup ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ maxWidth: "1000px", width: "100%" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ flexDirection: "column" }}>
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
                    <h2>{loggedInUser?.firstName} {loggedInUser.lastName}</h2>
                  </span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="close d-flex justify-content-end"
                  onClick={() => setArticlePopup(false)}
                  style={{ background: "transparent", border: "none" }}
                >
                  <h3 aria-hidden="true" className="m-3">&times;</h3>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <ReactQuill
                value={content}
                onChange={handleMemo}
                modules={modules}
                ref={quillRef}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <div onClick={handleSubmit} style={{ cursor: "pointer" }}>
                Post
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePopup;
