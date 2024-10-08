import { createSlice } from "@reduxjs/toolkit";
import { setThemeColor } from "../../../utils/setThemeColor";
import { fetchCompanyData } from "./userThunks";

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  error: null,
  recommendations: null,
  company: JSON.parse(localStorage.getItem("userCompanyData")) || null,
  unreadNotifications: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      state.loggedInUser = action.payload;
      setThemeColor(
        action.payload.isInvestor === "true" ? "investor" : "startup"
      );
      state.error = null;
      if (action.payload.isInvestor === "false") {
        const startupAccounts =
          JSON.parse(localStorage.getItem("StartupAccounts")) || [];
        const updatedStartupAccounts = startupAccounts.map((account) => {
          if (account?.user?._id === action?.payload?._id) {
            account.user = action.payload;
          }
          return account;
        });
        localStorage.setItem(
          "StartupAccounts",
          JSON.stringify(updatedStartupAccounts)
        );
      } else {
        const investorAccounts =
          JSON.parse(localStorage.getItem("InvestorAccounts")) || [];
        const updatedInvestorAccounts = investorAccounts.map((account) => {
          if (account.user._id === action.payload._id) {
            account.user = action.payload;
          }
          return account;
        });
        localStorage.setItem(
          "InvestorAccounts",
          JSON.stringify(updatedInvestorAccounts)
        );
      }
    },
    loginFailure: (state, action) => {
      localStorage.removeItem("loggedInUser");
      state.loggedInUser = null;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userCompanyData");
      localStorage.removeItem("allChatsData");
      state.loggedInUser = null;
      state.error = null;
      state.recommendations = null;
      state.company = null;
      setThemeColor("startup");
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    updateLoggedInUser: (state, action) => {
      state.loggedInUser = { ...state.loggedInUser, ...action.payload };
      let userData = JSON.parse(localStorage.getItem("loggedInUser"));
      userData = { ...userData, ...action.payload };
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
    },
    setUserCompany: (state, action) => {
      localStorage.setItem("userCompanyData", JSON.stringify(action.payload));
      state.company = action.payload;
    },
    updateUserCompany: (state, action) => {
      state.company = { ...state.company, ...action.payload };
      let userCompany = JSON.parse(localStorage.getItem("userCompanyData"));
      userCompany = { ...userCompany, ...action.payload };
      localStorage.setItem("userCompanyData", JSON.stringify(userCompany));
    },
    setUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
    decrementUnreadNotifications: (state, action) => {
      state.unreadNotifications = state.unreadNotifications - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyData.fulfilled, (state, action) => {
      if (action.payload) {
        localStorage.setItem("userCompanyData", JSON.stringify(action.payload));
      }
      state.company = action.payload;
      state.error = null;
    });
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  setRecommendations,
  updateLoggedInUser,
  setUserCompany,
  updateUserCompany,
  setUnreadNotifications,
  decrementUnreadNotifications,
} = userSlice.actions;

// LoggedInUser state selectors
export const selectIsInvestor = (state) => {
  return state.user.loggedInUser?.isInvestor === "true" ? true : false;
};
export const selectLoggedInUserId = (state) => state.user.loggedInUser?._id;
export const selectUserProfilePicture = (state) =>
  state.user.loggedInUser?.profilePicture;
export const selectUserOneLinkId = (state) =>
  state.user.loggedInUser?.oneLinkId;
export const selectUserInvestor = (state) => state.user.loggedInUser?.investor;
export const selectUserRecentExperience = (state) =>
  state.user.loggedInUser?.recentExperience;
export const selectUserRecentEducation = (state) =>
  state.user.loggedInUser?.recentEducation;
export const selectUserName = (state) =>
  state.user.loggedInUser?.firstName + " " + state.user.loggedInUser?.lastName;
export const selectUserEmail = (state) => state.user.loggedInUser?.email;
export const selectUserBio = (state) => state.user.loggedInUser?.bio;
export const selectUserFirstName = (state) =>
  state.user.loggedInUser?.firstName;
export const selectUserLastName = (state) => state.user.loggedInUser?.lasttName;

// unread Notifications selector
export const selectUnreadNotifications = (state) =>
  state.user.unreadNotifications;

// Investment philosophy selectors
export const selectUserSectorPreferences = (state) =>
  state.user.loggedInUser.sectorPreferences;
export const selectImportanceOfManagament = (state) =>
  state.user.loggedInUser.importanceOfManagament;
export const selectRoleAsAInvestor = (state) =>
  state.user.loggedInUser.roleAsAInvestor;
export const selectFounderAlmaMaterMatters = (state) =>
  state.user.loggedInUser.founderAlmaMaterMatters;
export const selectRiskManagementInInvestments = (state) =>
  state.user.loggedInUser.riskManagementInInvestments;
export const selectGuideOnSellingInvestments = (state) =>
  state.user.loggedInUser.guideOnSellingInvestments;
export const selectTimingInInvestmentDecisions = (state) =>
  state.user.loggedInUser.timingInInvestmentDecisions;
export const selectMacroeconomicFactorsInfluenceInvestments = (state) =>
  state.user.loggedInUser.macroeconomicFactorsInfluenceInvestments;
export const selectAssessCompanyCompetitiveAdvantage = (state) =>
  state.user.loggedInUser.assessCompanyCompetitiveAdvantage;
export const selectIndustryTrendsHoldInYourStrategy = (state) =>
  state.user.loggedInUser.industryTrendsHoldInYourStrategy;
export const selectEvaluateCompanyGrowthPotential = (state) =>
  state.user.loggedInUser.evaluateCompanyGrowthPotential;
export const selectWeightGaveToTechnologicalInnovation = (state) =>
  state.user.loggedInUser.weightGaveToTechnologicalInnovation;
export const selectUserInvestmentPhilosophy = (state) =>
  state.user.loggedInUser.philosophy;

// company state selectors
export const selectCompanyDataId = (state) => state.user.company?._id;
export const selectUserCompanyData = (state) => state.user.company;
export const selectCompanyName = (state) =>
  state.user.loggedInUser.isInvestor === "true"
    ? state.user.company?.companyName
    : state.user.company?.company;
export const selectColorCardData = (state) => state.user.company?.colorCard;
export const selectCompanyFounderId = (state) => state.user.company?.founderId;
export const selectUserStartupsInvested = (state) =>
  state.user.company?.startupsInvested;
export const selectUserSectorInterested = (state) =>
  state.user.company?.sectorInterested;
// export const selectUserInvestmentPhilosophy = (state) =>
//   state.user.company?.investmentPhilosophy;
export const selectMyInterests = (state) => state.user.company?.myInterests;
export const selectMyPastInvestments = (state) =>
  state.user.company?.pastInvestments;
export const selectFundingQuestions = (state) =>
  state.user.loggedInUser?.fundingViaCapitalhubQuestions;
export const selectUserOneLink = (state) => state.user.company?.oneLink;
export const selectUserSocialLinks = (state) => state.user.company?.socialLinks;
export const selectCompanyStage = (state) => state.user.company?.stage;
export const selectCompanyAge = (state) => state.user.company?.age;
export const selectCompanyRevenue = (state) => state.user.company?.revenue;

export default userSlice.reducer;
