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

const profilePage = [
  {
    target: ".professional_info_section",
    content: "some text here",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#missingDetails",
    content: "some text here",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".milestones",
    content: "some text here",
    placement: "auto",
    disableBeacon: true,
  },
];

const explorePage = [
  {
    target: ".filter_container",
    content:
      "Greetings! You've arrived at the exploration area of The Capital Hub.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".startup_explore_tabs",
    content: "Select the category you're interested in.",
  },
  {
    target: ".startup_filters_container",
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
    target: "#sidebar_explore",
    title: "Explore",
    content:
      "Filter the Startups, Founders and Investors on the platform to find who you are truly looking for.",
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
    target: "#sidebar_documentation",
    title: "Documentation",
    content:
      "Every document related to your business can be uploaded here to reflect on your OneLink",
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
  {
    target: "#oneLinkEdit",
    title: "Edit One-Link Details",
    content: "Click here to edit your One-Link details.",
    placement: "auto",
    disableBeacon: true,
  },
];

const documentationPage = [
  {
    target: ".upload_container",
    title: "Upload Document",
    content: "This is where you can upload documents under folders.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#Pitch_Deck",
    title: "Pitch Deck",
    content:
      "This is the first of the four preset folders available to you. View files under Pitch Deck here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#Business",
    title: "Business",
    content: "View uploaded files under Business here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#KYC_Details",
    title: "KYC Details",
    content: "View uploaded files under KYC Details here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: "#Legal_And_Compliance",
    title: "Legal And Compliance",
    content: "View uploaded files under Legal and Compliance here.",
    placement: "auto",
    disableBeacon: true,
  },
];

const chatsPage = [
  {
    target: ".chat_search_container",
    title: "Chat Search",
    content: "Search your chats from here.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".communities__wrapper",
    title: "Communities",
    content:
      "Find your communities here. You can create a new one from here as well.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".chatsidebar_main_container",
    title: "Recent Chats",
    content: "Here are your recent and pinned chats.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".chat_navbar_container",
    title: "Chat Info",
    content: "Click on the Profile Picture or Name to open the chat settings.",
    placement: "auto",
    disableBeacon: true,
  },
  {
    target: ".chat_settings",
    title: "Chat Settings",
    content: "This is the chat settings.",
    placement: "auto",
    disableBeacon: true,
  },
];

// Keep this in the bottom
export const startupOnboardingSteps = {
  profilePage,
  explorePage,
  homePage,
  oneLinkPage,
  documentationPage,
  chatsPage,
};
