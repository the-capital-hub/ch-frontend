// designSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageTitle: "",
  isMobileView: "",
  showOnboarding: false,
  showCreatePostModal: false,
  showInvestorCreatePostModal: false,
  showNotificationModal: false,
  isMobileApp: false,
  theme: localStorage.getItem("theme") || "dark",
  videoAutoplay: false,
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    setShowOnboarding: (state, action) => {
      state.showOnboarding = action.payload;
    },
    toggleCreatePostModal: (state) => {
      state.showCreatePostModal = !state.showCreatePostModal;
    },
    toggleinvestorCreatePostModal: (state) => {
      state.showInvestorCreatePostModal = !state.showInvestorCreatePostModal;
    },
    toggleNotificationModal: (state) => {
      state.showNotificationModal = !state.showNotificationModal;
    },
    setIsMobileApp: (state, action) => {
      state.isMobileApp = action.payload;
    },
    toggleTheme: (state, action) => {
      if (state.theme === "light") {
        localStorage.setItem("theme", "dark");
        state.theme = "dark";
      } else {
        state.theme = "light";
        localStorage.setItem("theme", "light");
      }
    },
    toggleVideoAutoplay: (state) => {
      state.videoAutoplay = !state.videoAutoplay;
    },
  },
});

// Selectors
export const selectShowOnboarding = (state) => state.design.showOnboarding;
export const selectIsMobileView = (state) => state.design.isMobileView;
export const selectCreatePostModal = (state) =>
  state.design.showCreatePostModal;
export const selectInvestorCreatePostModal = (state) =>
  state.design.showInvestorCreatePostModal;
export const selectNotificationtModal = (state) =>
  state.design.showNotificationModal;
export const selectIsMobileApp = (state) => state.design.isMobileApp;
export const selectTheme = (state) => state.design.theme;
export const selectVideoAutoplay = (state) => state.design.videoAutoplay;

export const {
  setPageTitle,
  setIsMobileView,
  setIsMobileApp,
  setShowOnboarding,
  toggleCreatePostModal,
  toggleinvestorCreatePostModal,
  toggleNotificationModal,
  toggleTheme,
  toggleVideoAutoplay,
} = designSlice.actions;

export default designSlice.reducer;
