import React, { useEffect, useState } from "react";
import "./ColorCard.scss";
import { postStartUpData, postInvestorData } from "../../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserCompany } from "../../../../Store/features/user/userSlice";

const ColorCard = ({
  color,
  text,
  image,
  amount,
  background,
  onAmountChange,
  field,
  colorCardData,
  className,
  noRupee,
  isInvestor = false,
  isOneLink = false,
  isNotEditable,
}) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedAmount, setEditedAmount] = useState(amount);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedAmount(amount);
  }, [amount]);

  const handleEditClick = () => {
    if (!isNotEditable) setIsEditMode(true);
  };

  const handleAmountChange = (e) => {
    setEditedAmount(e.target.value);
  };

  const handleBlur = () => {
    setIsEditMode(false);
    onAmountChange(editedAmount);
    const updatedData = {
      founderId: loggedInUser._id,
      colorCard: { ...colorCardData, [field]: editedAmount },
    };
    if (isInvestor) {
      postInvestorData(updatedData)
        .then((res) => {
          console.log("Res-->", res);
          dispatch(setUserCompany(res.data));
        })
        .catch((error) => {
          console.error("Error-->", error);
        });
    } else {
      postStartUpData(updatedData)
        .then((res) => {
          console.log("Res-->", res);
          dispatch(setUserCompany(res.data));
        })
        .catch((error) => {
          console.error("Error-->", error);
        });
    }
  };

  return (
    <div
      className={`${className} colorcard-component card row border`}
      style={{
        //backgroundColor: "rgba(255, 115, 115, 1)"
        backgroundColor: "#333333",
        padding: "5px 10px",
        justifyContent:"space-between"
      }}
    >
      <div className="col-7 col-sm-6 left-content">
        <>
          <h3 className="title" style={{ color: "#fff" }}>
            {text}
          </h3>
          {isEditMode ? (
            <input
              type="text"
              className="edit_input"
              id="edit"
              value={editedAmount}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span
              className="rupee-sign"
              onClick={onAmountChange ? handleEditClick : () => {}}
              style={{ color: "#fff" }}
            >
              {!noRupee && ""} {editedAmount}{" "}
              {!isOneLink && !isNotEditable && (
                <label htmlFor="edit" className="edit-tip">
                  Click to edit
                </label>
              )}
            </span>
          )}
        </>
      </div>
      <div
        style={{
          backgroundColor: "rgba(231, 177, 91, 0.2)",
          borderRadius: "10px",
          padding:"5px",
          width:"70px"
        }}
      >
        <img src={image} alt="Card" width={60} />
      </div>
    </div>
  );
};

export default ColorCard;
