import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChatsAPI , getTotalUnreadMessagesCount} from "../../../Service/user";

// Thunk for allChatsData
export const fetchAllChats = createAsyncThunk(
  "chat/getAllChats",
  async () => {
    try {
      const { data } = await getAllChatsAPI();
      return data;
    } catch (error) {
      console.error("Error fetching all chats data:", error);
    }
  },
  {
    condition: (_, { getState }) => {
      const { chat } = getState();
      const { allChatsStatus } = chat;
      if (allChatsStatus === "loading" || allChatsStatus === "success") {
        return false;
      }
    },
  }
);

// Thunk to fetch total unread messages count
export const fetchTotalUnreadMessagesCount = createAsyncThunk(
  "chat/fetchTotalUnreadMessagesCount",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getTotalUnreadMessagesCount(userId);
      return data; // This should be the data from your API response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

