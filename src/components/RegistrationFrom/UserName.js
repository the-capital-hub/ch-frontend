import React, { useState } from "react";
import "./registrationFrom.scss";
import { updateUserAPI, getUserByUserName } from "../../Service/user";

const UserName = ({ setFromStep }) => {
  const [next, setNext] = useState(false);
  const [userName, setUserName] = useState("");
  const [suggestedName, setSuggestedName] = useState([]);

  const handelNext = async () => {
    try {
      const response = await getUserByUserName(userName);
      if (response.status === 200 && response.data) {
        // Username exists, show alert and prevent moving forward
        alert("Username already exists. Please choose another one.");
      } else {
        // Username does not exist, proceed with updating the user
        const res = await updateUserAPI({ userName });
        if (res.status === 200) {
          setFromStep(1);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Username does not exist, proceed with updating the user
        const res = await updateUserAPI({ userName });
        if (res.status === 200) {
          setFromStep(1);
        }
      } else {
        // Handle other errors (e.g., network issues)
        console.error("An error occurred:", error);
      }
    }
  };

  const generateSuggestions = async () => {
    try {
      const response = await getUserByUserName(userName);
      if (response.status === 200 && response.data) {
        // Username exists, show suggestions
        const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*"];
        const getRandomSpecialChar = () => {
          const randomIndex = Math.floor(Math.random() * specialChars.length);
          return specialChars[randomIndex];
        };
        const getRandomNumber = (digits) => {
          return Math.floor(Math.random() * Math.pow(10, digits)).toString();
        };

        setSuggestedName([
          `${userName}_${getRandomNumber(3)}`,
          `${userName}_${getRandomNumber(4)}`,
          `${userName}_${getRandomNumber(4)}`,
        ]);
        setNext(true);
      } else {
        // Username does not exist, move to the next step
        setFromStep(1);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Username does not exist, move to the next step
        setFromStep(1);
      } else {
        // Handle other errors (e.g., network issues)
        console.error("An error occurred:", error);
      }
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setUserName(value);

    try {
      const response = await getUserByUserName(value);
      if (response.status === 200 && response.data) {
        // Username exists, show alert
        alert("Username already exists. Please choose another one.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Username does not exist, allow user to continue typing
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <>
      {next ? (
        <>
          <div className="popup">
            <div className="input_container">
              <label>Username</label>
              <input
                value={userName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            className="popup"
            style={{ marginTop: "2rem", padding: "1.5rem" }}
          >
            <div style={{ width: "100%" }}>
              <h6>Suggestions</h6>
              {suggestedName.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid",
                    width: "100%",
                    height: "30px",
                    padding: "0 5px",
                    borderRadius: "5px",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setUserName(item);
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <button className="from_btn startup" onClick={handelNext}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="popup">
          <div className="input_container">
            <label>Username</label>
            <input
              onChange={handleInputChange}
            />
          </div>
          <button className="from_btn startup" onClick={generateSuggestions}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default UserName;
