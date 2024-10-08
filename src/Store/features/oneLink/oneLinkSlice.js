import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  oneLinkUser: null, 
  oneLinkLoggedIn: false,
  oneLinkId: null,
};

const oneLinkSlice = createSlice({
  name: 'onelink',
  initialState,
  reducers: {
    login: (state, action) => {
      state.oneLinkUser = action.payload.oneLinkUser;
      state.oneLinkLoggedIn = true;
      state.oneLinkId = action.payload.oneLinkId;
    },
  },
});

export const { login, 
  // logout
 } = oneLinkSlice.actions;
export default oneLinkSlice.reducer;
