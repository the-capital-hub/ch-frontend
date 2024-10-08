// PasswordModal.js
import React, { useState } from "react";
import Modal from 'react-modal';
import './DeleteModal.scss'
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";

const PasswordModal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  const theme = useSelector(selectTheme);
  
  const handleConfirm = () => {
    onConfirm(password);
    setPassword(""); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Password Confirmation"
      style={{
        overlay: {
          backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.75)"
        },
        content: {
          backgroundColor: theme === "dark" ? "black" : "white",
          color: theme === "dark" ? "white" : "black"
        }
      }}
    >
      <center><h5>Enter Password to delete your Company from our Servers</h5></center>
      <input
        type="password"
        className="passDeleteCompany"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="actionDelete">
        <button className="DeleteBTN" onClick={handleConfirm}>Yes, Delete my Company</button>
        <button className="DeleteBTN" onClick={onClose}>Cancel</button>
      </div>
      
    </Modal>
  );
};

export default PasswordModal;
