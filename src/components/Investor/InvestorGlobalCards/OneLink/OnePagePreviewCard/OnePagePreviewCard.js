// import React, { useState } from "react";
// import "./OnePagePreviewCard.scss";
// import { useSelector } from "react-redux";
// import { postStartUpData } from "../../../../../Service/user";

// const OnePagePreviewCard = ({ company, page }) => {
//   const loggedInUser = useSelector((state) => state.user.loggedInUser);
//   const [editedContent, setEditedContent] = useState({});
//   const [editable, setEditable] =useState(false)

//   const cardData = [
//     {
//       field: "problem",
//       title: "1.Problem",
//       content:
//         company?.problem ||
//         `Enter the problem statement your startup is addressing`,
//     },
//     {
//       field: "solution",
//       title: "2.Solution",
//       content:
//         company?.solution || "Enter the solution your startup is offering",
//     },
//     {
//       field: "competitiveLandscape",
//       title: "3.Competitive Landscape",
//       content: company?.competitiveLandscape || "Mention your competitors",
//     },
//     {
//       field: "growthModel",
//       title: "4.Revenue Model",
//       content: company?.growthModel || "Your startup’s revenue model",
//     },
//     {
//       field: "growthStrategy",
//       title: "5.Growth Strategy",
//       content: company?.growthStrategy || "Your Growth startegy",
//     },
//     {
//       field: "marketTraction",
//       title: "6.Market Traction",
//       content: company?.marketTraction || "Your Market traction",
//     },
//     // { title: "7.Business Model", content: "Your Business Model" },
//   ];

//   const handleUpdate = (field, newValue) => {
//     setEditable(true)
//     if (!newValue) return;
//     setEditedContent({ ...editedContent, [field]: newValue });

//     postStartUpData({
//       [field]: newValue,
//       founderId: loggedInUser._id,
//     })
//       .then(({ data }) => {
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <div className="row onepage_card_container">
//         {cardData.map((card, index) => (
//           <div className="col-md-6 col-lg-4" key={index}>
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">{card.title}</h5>
//                 {page === "oneLinkEdit" ? (
//                   editable ? (
//                     <textarea
//                       type="text"
//                       className="card-text"
//                       placeholder={card.field}
//                       value={editedContent[card.field] || card.content}
//                       onChange={(e) => handleUpdate(card.field, e.target.value)}
//                       onBlur={() =>
//                         handleUpdate(card.field, editedContent[card.field])
//                       }
//                     />
//                   ) : (
//                     <h6 onClick={handleUpdate} >{card.content}</h6>
//                   )
//                 ) : (
//                   <h6 onClick={handleUpdate}>{card.content}</h6>
//                 )}

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default OnePagePreviewCard;

import React, { useState } from "react";
import "./OnePagePreviewCard.scss";
import { useSelector } from "react-redux";
import { postStartUpData } from "../../../../../Service/user";

const OnePagePreviewCard = ({ company, page }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [editedContent, setEditedContent] = useState({});
  const [editableIndex, setEditableIndex] = useState(null);
  const [value, setValue] = useState(false);

  const cardData = [
    {
      field: "problem",
      title: "Problem",
      content:
        company?.problem ||
        `Enter the problem statement your startup is addressing`,
    },
    {
      field: "solution",
      title: "Solution",
      content:
        company?.solution || "Enter the solution your startup is offering",
    },
    {
      field: "marketLandscape",
      title: "Market Landscape",
      content: company?.competitiveLandscape || "Mention your competitors",
    },
    // {
    //   field: "growthModel",
    //   title: "Revenue Model",
    //   content: company?.growthModel || "Your startup’s revenue model",
    // },
    // {
    //   field: "growthStrategy",
    //   title: "Growth Strategy",
    //   content: company?.growthStrategy || "Your Growth startegy",
    // },
    // {
    //   field: "marketTraction",
    //   title: "Market Traction",
    //   content: company?.marketTraction || "Your Market traction",
    // },
    // { title: "Business Model", content: "Your Business Model" },
  ];

  const handleUpdate = (field, newValue) => {
    console.log("field, newValue", field, newValue);
    if (!newValue) return;
    setEditedContent({ ...editedContent, [field]: newValue });

    postStartUpData({
      [field]: newValue,
      founderId: loggedInUser._id,
    })
      .then((data) => {
        console.log("saved data", data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="onepage_card_container">
        {cardData.map((card, index) => (
          <div className="card_item" key={index} >
            <div className="card m-0">
              <div
                className="card-body"
                onClick={() => setEditableIndex(index)}
              >
                <h5 className="card-title">{card.title}</h5>
                {page === "oneLinkEdit" ? (
                  editableIndex === index ? (
                    <textarea
                      type="text"
                      className="card-text m-0 fs-6"
                      placeholder={card.field}
                      value={value || card.content}
                      onChange={(e) => setValue(e.target.value)}
                      onBlur={() => {
                        handleUpdate(card.field, value);
                        setEditableIndex(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <h6
                      // onClick={() => setEditableIndex(index)}
                      style={{ wordBreak: "break-word" }}
                    >
                      {card.content}
                    </h6>
                  )
                ) : (
                  <h6 style={{ wordBreak: " break-word" }}>{card.content}</h6>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OnePagePreviewCard;
