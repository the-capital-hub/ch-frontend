import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { getPdfData, userPosts } from "../../../Service/user";
import {selectTheme } from "../../../Store/features/design/designSlice";

export const userRequiredFields = [
  "bio",
  "designation",
  "education",
  "experience",
  "startUp"
];

export const oneLinkRequiredFields = [
  "introductoryMessage"
];

export const companyRequiredFields = [
  "SOM",
  "TAM",
  "colorCard",
  "company",
  "description",
  "fundingsAsk",
  "lastFunding",
  "location",
  "mission",
  "noOfEmployees",
  "productStage",
  "sector",
  "socialLinks",
  "stage",
  "startedAtDate",
  "tagline",
  "team",
  "vision"
];

export const documentRequiredFields = [
  "pitchdeck",
  "business",
  "kycdetails",
  "legal and compliance"
];

const UserMilestones = ({ pageTheme, requiredFields }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedInUserCompany = useSelector((state) => state.user.company);
  const user = pageTheme === "company"
    ? loggedInUserCompany
    : pageTheme === "documents"
    ? "documents"
    : pageTheme === "posts"
    ? "posts"
    : loggedInUser;

  const [pdfDocumentsCount, setPdfDocumentsCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await userPosts();
        setPostCount(response.data.allPosts.length);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    };

    fetchUserPosts();
  }, [loggedInUser]);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const pdfDataLegal = await getPdfData(loggedInUser?.oneLinkId, "legal and compliance");
        const pdfDataKyc = await getPdfData(loggedInUser?.oneLinkId, "kycdetails");
        const pdfDataBusiness = await getPdfData(loggedInUser?.oneLinkId, "business");
        const pdfDataPitch = await getPdfData(loggedInUser?.oneLinkId, "pitchdeck");
        const documentsLength = (pdfDataBusiness.data.length +
                                  pdfDataKyc.data.length +
                                  pdfDataLegal.data.length +
                                  pdfDataPitch.data.length);
        setPdfDocumentsCount(documentsLength);
      } catch (error) {
        console.error("Failed to fetch PDF data:", error);
      }
    };

    if (loggedInUser?.oneLinkId) {
      fetchPdf();
    }
  }, [loggedInUser?.oneLinkId]);

  const calculateProfileCompletion = (user, requiredFields) => {
    if (user === "posts") {
      return postCount > 0 ? 100 : 0;
    } else if (user === "documents") {
      return pdfDocumentsCount <= 4 ? (pdfDocumentsCount / 4) * 100 : 100;
    } else if (user && requiredFields) {
      const filledFields = requiredFields.filter(
        (field) => user[field] && user[field].length !== 0
      );
      return (filledFields.length / requiredFields.length) * 100;
    }
    return 0;
  };

  const completion = calculateProfileCompletion(user, requiredFields);

  return (
    <div style={{ width: 60, height: 60, margin: "0.5rem 5px" }}>
      <CircularProgressbar
        value={completion}
        text={`${Math.round(completion)}%`}
        styles={buildStyles({
          pathColor: pageTheme === "investor" ? "rgba(211, 243, 107, 1)" : "#fd5901",
          textColor: theme === "dark" ? "white" : "black",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default UserMilestones;