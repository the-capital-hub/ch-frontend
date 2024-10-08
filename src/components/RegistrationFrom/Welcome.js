import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import API from "../../api";
import axios from "axios";
import { loginSuccess } from "../../Store/features/user/userSlice";
import { fetchCompanyData } from "../../Store/features/user/userThunks";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [profilePick, setProfilePick] = useState("");
  const [user,setUser] = useState({})
  const [userName, setUserName] = useState("");
  const axiosInstance = axios.create({
    baseURL: API.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Request interceptor to include the token in the 'Authorization' header
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    const getUserData = async () => {
        const userData = JSON.parse(localStorage.getItem("user_data"))
      const res = await axiosInstance.get(API.getUserById + "/" + userData._id);;
      setProfilePick(res.data.data.profilePicture);
      setUserName(res.data.data.userName);
      setUser(res.data.data)
    };
    getUserData();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelNext = async()=>{
    localStorage.setItem("isLoggedIn", "true");
      const storedAccountsKey =
        user.isInvestor === "true" ? "InvestorAccounts" : "StartupAccounts";

      const storedAccounts =
        JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
      const isAccountExists = storedAccounts.some(
        (account) => account?.user?._id === user?._id
      );

      if (!isAccountExists) {
        storedAccounts.push(user);
        localStorage.setItem(
          storedAccountsKey,
          JSON.stringify(storedAccounts)
        );
      }

      setTimeout(() => {
        if (!user.investor) navigate("/home");
        else navigate("/investor/home");
      }, 2000);
      console.log(user)
      dispatch(loginSuccess(user));
      // Fetch company data asynchronously
      let isInvestor = user.isInvestor === "true" ? true : false;
      if (isInvestor) {
        dispatch(fetchCompanyData(user.investor, isInvestor));
      } else {
        dispatch(fetchCompanyData(user._id, isInvestor));
      }

      // Fetch all Chat data
      dispatch(fetchAllChats());
  }
  return (
    <div className="popup">
      <div className="profile_pick">
        {profilePick ? (
          <img src={profilePick} alt="Profile" style={{ width: "100%" }} />
        ) : (
          <FaUser style={{ fontSize: "4rem" }} />
        )}
      </div>
      <h2 style={{padding:"10px"}}>Welcome to the capital hub</h2>
      <p style={{padding:"0 0 10px"}}>{userName}</p>
      <button
        className="from_btn startup"
        onClick={handelNext}
      >
        Continue
      </button>
    </div>
  );
};

export default Welcome;
