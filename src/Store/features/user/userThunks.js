import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInvestorById, getStartupByFounderId } from "../../../Service/user";

// Async Thunk for companyData
export const fetchCompanyData = createAsyncThunk(
  "user/companyData",
  async (userId, isInvestor) => {
    try {
      if (isInvestor) {
        const { data } = await getStartupByFounderId(userId);
        return data;
      } else {
        const { data } = await getInvestorById(userId);
        return data;
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  }
);
