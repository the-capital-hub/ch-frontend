import React, { useState, useEffect } from "react";
import "./OneLinkContactEdit.scss";
import { getUserById } from "../../../../../../Service/user";
import { updateUserById } from "../../../../../../Service/user";

const OneLinkContactEdit = ({ oneLink, page }) => {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    getUserById(oneLink)
      .then(({ data }) => {
        setUser(data);
        setEditedUser(data);
      })
      .catch(() => setUser({}));
  }, [oneLink]);

  const handleUpdate = (field) => {
    if (!editedUser[field]) return;
    updateUserById(user._id, { [field]: editedUser[field] })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (field, event) => {
    const updatedValue = event.target.value;
    setEditedUser({ ...editedUser, [field]: updatedValue });
  };

  const renderEditableField = (field) => {
    return (
      <input
        type="text"
        value={editedUser[field] || ""}
        onChange={(e) => handleInputChange(field, e)}
        onBlur={() => handleUpdate(field)}
        className="p-3"
      />
    );
  };

  const renderNonEditableField = (field) => {
    return <p>{user[field]}</p>;
  };

  return (
    <>
      <div className="contact_details_container">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title px-2">Contact Details</h5>
            <div className="card_inputs">
              {page === "oneViewEdit" ? (
                <>
                  {renderEditableField("firstName")}
                  {renderEditableField("phoneNumber")}
                  {renderEditableField("email")}
                </>
              ) : (
                <>
                  {renderNonEditableField("firstName")}
                  {renderNonEditableField("phoneNumber")}
                  {renderNonEditableField("email")}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneLinkContactEdit;
