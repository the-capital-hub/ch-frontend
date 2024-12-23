import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    collapsed: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    },
    setSidebar: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export const selectSidebarCollapsed = (state) => state.sidebar.collapsed;
export default sidebarSlice.reducer;