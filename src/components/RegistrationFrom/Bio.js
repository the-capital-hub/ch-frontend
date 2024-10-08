import React, { useState } from 'react'
import { updateUserAPI } from '../../Service/user';

const Bio = ({setFromStep}) => {
    const [bio,setBio] = useState("")
    const handelNext = async () => {
        const res =await updateUserAPI({bio});
        if (res.status === 200) {
          setFromStep(3);
        }
      };
  return (
    <div className="popup">
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <label>Bio</label>
      <textarea
        style={{
          width: "100%",
          borderRadius: "10px",
          outline: "none",
          padding: "4px",
          minHeight:"150px",
          fontSize:"14px"
        }}
        onChange={(e)=>{setBio(e.target.value)}}
      />
    </div>
    <p style={{width:"100%",textAlign:"end",fontSize:"12px"}}>Min 300 Characters</p>
    <button
      className="from_btn startup"
      onClick={handelNext}
    >
      Next
    </button>
    <button
    onClick={() => {
      setFromStep(3);
    }}
    className="from_btn"
  >
    {">>"}Skip
  </button>
  </div>
  )
}

export default Bio