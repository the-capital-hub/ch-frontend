import { Image } from "react-bootstrap";

export default function ImageAttachment({
  selectedImage,
  removeSelectedImage,
}) {
  return (
    <>
      {selectedImage && (
        <div className="image-preview">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected media"
            fluid
          />
          <button className="remove-preview" onClick={removeSelectedImage}>
            X
          </button>
        </div>
      )}
    </>
  );
}
