/*
--- Sample step ---

const steps = [
  {
    target: "# or .",
    content: "",
    action: () => {} // action will be called on next button
  },
]; 

*/

const explorePage = [
  {
    target: ".filter_container",
    content:
      "Greetings! You've arrived at the exploration area of The Capital Hub.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".filter_by",
    content: "Select the category you're interested in.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".investor_explore_filters_container",
    content: "Customize your search by applying filters.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".filtered-results",
    content: "Browse through all the search results.",
    placement: "auto",
    disableBeacon: true,
  },
];

const profilePage = [
  {
    target: ".professional_info_section",
    title: "Profile Page",
    content: "Add or Edit your professional information here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#missingDetails",
    title: "Fill-in Information",
    content: "Complete your profile setup with the Capital HUB chat assistant.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#userBio",
    title: "Bio",
    content: "Add or Edit information about yourself.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".AchievementsComponent",
    title: "Acheivements",
    content: "Showcase your accomplishments with Capital HUB to everyone!",
    placement: "right-center",
    disableBeacon: true,
  },
  {
    target: ".startups_invested",
    title: "Startups Invested",
    content: "Add information about the Startups you have Invested in.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".sector_interested",
    title: "Sectors Interested",
    content: "Add or edit Sectors that intrigue you here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".investment_philosophy",
    title: "Investment Philosophy",
    content: "Fill information about your Investment Philosophy here.",
    placement: "right-start",
    disableBeacon: true,
  },
];

const homePage = [
  {
    target: ".pro-sidebar-header",
    title: "Profile",
    content:
      "Your profile page describes everything relevant about you as a Professional.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_createAPost",
    title: "Create A Post",
    content: "Share your thoughts with other Founders and Investors.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_companyProfile",
    title: "Company",
    content: "Show the world what you’re building!",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_oneLink",
    title: "OneLink",
    content:
      "Your resume for everything related to fundraising, regardless of which side of a pitch day you’re on.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_community",
    title: "Community",
    content:
      "Network with like-minded Founders and Investors in a private encrypted Community.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_explore",
    title: "Explore",
    content:
      "Filter the Startups, Founders and Investors on the platform to find who you are truly looking for.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_myStartups",
    title: "My Startups",
    content: "Add or Edit your Investments and Interests from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_mySchedule",
    title: "My Schedule",
    content:
      "Manage meetings with Fund Seekers or Interested individuals from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_savedPosts",
    title: "Saved Posts",
    content: "Revisit gems shared by experienced veterans on this platform.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#sidebar_connections",
    title: "Connections",
    content:
      "Remember, you are as worthy as your connections are. So get connecting on Capital HUB",
    placement: "auto",
    disableBeacon: true,
  },
  
];

const myStartupsPage = [
  {
    target: "#myInvestmentsCards",
    title: "My Investments",
    content: "Information about your Investments can be seen here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#editInvestments",
    title: "Add New / Edit Investment",
    content:
      "Add a new Investment or Edit information of an existing Investment from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#myInterestsCards",
    title: "My Interests",
    content: "Information about your Interests can be seen here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#editInterests",
    title: "Add New / Edit Interest",
    content:
      "Add a new Interest or Edit information of an existing Interest from here.",
    placement: "auto",
    disableBeacon: true,
  },
];

const mySchedulePage = [
  {
    target: ".view__selector",
    title: "My Schedule",
    content: "Switch Calendar views between 'Day', 'Week' and 'Month'.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".calendar__container",
    title: "Calendar",
    content:
      "Create meetings by dragging over a time slot on the calendar. Click on a created meeting to know more information.",
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: ".rbc-toolbar",
    title: "Calendar",
    content: "Got to previous or next Day, Week or Month from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#viewRequests",
    title: "View Requests",
    content:
      "View details about a meeting request by clicking here. You can Accept or Decline the request from here as well.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".meetings__div",
    title: "Meetings",
    content:
      "Find your regularly scheduled meetings organized by their frequency here.",
    placement: "left-start",
    disableBeacon: true,
  },
];

const savedPostsPage = [
  {
    target: ".navigation-header",
    title: "Collections",
    content: "Navigate through your collections",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".card-viewer",
    title: "Saved Posts",
    content:
      "List of Saved Posts from your collection. Each post can be removed from the collection here.",
    placement: "auto",
    disableBeacon: true,
  },
];

const connectionsPage = [
  {
    target: ".content_section",
    title: "Connections",
    content: "Manage your Connections on Capital HUB from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".connection_nav",
    title: "Connections",
    content: "Switch between Received, Sent and Accepted connection requests.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".connection_list",
    title: "Connection Requests",
    content: "Manage your Received, Sent and Accepted connection requests.",
    placement: "auto",
    disableBeacon: true,
  },
];

const companyProfilePage = [
  {
    target: "#editCompanyDetails",
    title: "Company Profile",
    content: "Click here to information in your Company Profile.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#chooseCompany",
    title: "Select Company Profile",
    content: "Select an existing profile of your Company.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".company__profile",
    title: "Company Profile",
    content: "Your Company Profile with all the relevant information.",
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: "#createCompanyProfile",
    title: "Create your Company Profile",
    content: "Click here to create a new Company Profile.",
    placement: "auto",
    disableBeacon: true,
  },
];

const oneLinkPage = [
  {
    target: ".ShareLink_container",
    title: "Share OneLink",
    content: "Share your oneLink from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".introductory_message_container",
    title: "Introductory Message",
    content: "Add or Edit your Introductory message from here.",
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: ".onePager_wrapper",
    title: "One-Pager Preview",
    content: "This is the OnePager Preview. Check your One-Link details here.",
    placement: "auto",
    disableBeacon: true,
  },
];

const companyProfileEditPage = [
  {
    target: "#profileFormContainer",
    title: "Company Information",
    content: "Add or Edit primary details about your Company in this form.",
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: ".paragraph__component",
    title: "Company Description",
    content: "Add or Edit a short description of what your Company is about.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".core__team",
    title: "Core Team",
    content: "Add or Edit members of your Core Team.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".milestones__component",
    title: "Milestones",
    content: "Add or Edit Milestones you have accomplished with Capital HUB.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".card_holder",
    title: "Investment Overview",
    content: "Edit details about Investement details here.",
    placement: "auto",
    disableBeacon: true,
  },
];

// Keep this in the bottom
export const investorOnboardingSteps = {
  explorePage,
  homePage,
  myStartupsPage,
  profilePage,
  mySchedulePage,
  savedPostsPage,
  connectionsPage,
  companyProfilePage,
  oneLinkPage,
  companyProfileEditPage,
};
