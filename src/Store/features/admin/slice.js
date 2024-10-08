import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authAdmin: JSON.parse(localStorage.getItem("tchAdmin")) || null,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("tchAdmin", JSON.stringify(action.payload));
      localStorage.setItem("tchAdminToken", action.payload.token);
      state.authAdmin = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      localStorage.removeItem("tchAdmin");
      localStorage.removeItem("tchAdminToken");
      state.authAdmin = null;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("tchAdmin");
      localStorage.removeItem("tchAdminToken");
      state.authAdmin = null;
      state.error = null;
    },
    updateAuthAdmin: (state, action) => {
      state.authAdmin = { ...state.authAdmin, ...action.payload };
      let adminData = JSON.parse(localStorage.getItem("tchAdmin"));
      adminData = { ...adminData, ...action.payload };
      localStorage.setItem("tchAdmin", JSON.stringify(adminData));
    },
  },
});

export const { loginSuccess, loginFailure, logout, updateAuthAdmin } =
  adminSlice.actions;

export default adminSlice.reducer;
