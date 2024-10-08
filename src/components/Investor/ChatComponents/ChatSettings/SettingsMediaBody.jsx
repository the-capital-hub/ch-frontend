import { useSelector } from "react-redux";
import Modal from "../../../PopUp/Modal/Modal";
import BSCarousel from "../../../Carousel/BSCarousel/BSCarousel";
import BSCarouselItem from "../../../Carousel/BSCarousel/BSCarouselItem/BSCarouselItem";
import "./SettingsMediaBody.scss";

export default function SettingsMediaBody({ toggleModal, showModal }) {
  const chatProfile = useSelector((state) => state.chat.chatProfile);
  const communityProfile = useSelector((state) => state.chat.communityProfile);
  const isCommunitySelected = useSelector(
    (state) => state.chat.isCommunitySelected
  );

  const media = isCommunitySelected
    ? communityProfile?.media
    : chatProfile?.media;

  return (
    <>
      <div
        className="px-2 py-3 d-flex gap-2 media-body"
        style={{ maxHeight: "20vh", overflow: "auto", maxWidth: "80vw" }}
      >
        {/* Loop media images here */}
        {communityProfile?.media?.length || chatProfile?.media?.length ? (
          <>
            {media?.map(({ image, video }, index) => (
              <div
                className="bg-white rounded-2 d-flex justify-content-center align-items-center shadow-sm p-2"
                style={{ height: "100px", width: "100px" }}
              >
                {image && (
                  <img
                    key={index}
                    src={image}
                    alt="media item"
                    className="rounded-2 object-fit-cover"
                    width={90}
                    height={90}
                  />
                )}
                {video && (
                  <video
                    alt="media item"
                    className="rounded-2 object-fit-cover"
                    width={90}
                    height={90}
                  >
                    <source src={video} type={"video/mp4"} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="text-center w-100 p-0 m-0">No media.</p>
        )}
      </div>
      {showModal && media?.length && (
        <Modal className="chat-media-popup d-flex flex-column">
          <header className="d-flex justify-content-between align-items-center p-0 mb-2 border-bottom">
            <span>All Media</span>
            <button
              className="btn btn-sm btn-light m-2"
              onClick={() => toggleModal(false)}
            >
              X
            </button>
          </header>
          <div className="all-media">
            <BSCarousel
              id="showAllMedia"
              dataLength={media?.length}
              className="border rounded"
            >
              {media?.map(({ image, video }, index) => (
                <BSCarouselItem key={index} index={index}>
                  {image && (
                    <img
                      src={image}
                      alt="media item"
                      className="rounded-2"
                      style={{
                        width: "50vw",
                        height: "50vh",
                        objectFit: "contain",
                      }}
                    />
                  )}
                  {video && (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "50vw", height: "50vh" }}
                    >
                      <video
                        controls
                        alt="media item"
                        className="rounded-2"
                        style={{
                          width: "70%",
                        }}
                      >
                        <source src={video} type={"video/mp4"} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </BSCarouselItem>
              ))}
            </BSCarousel>
          </div>
        </Modal>
      )}
    </>
  );
}
