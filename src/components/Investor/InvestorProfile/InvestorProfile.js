import React, { useState, useEffect } from "react";
import "./InvestorProfile.scss";
import { useDispatch, useSelector } from "react-redux";


import InvestorDetail from "./InvestorDetail";
import { selectIsInvestor,selectCompanyName, loginSuccess, updateUserCompany } from "../../../Store/features/user/userSlice";
import { postInvestorData, postStartUpData, updateUserAPI } from "../../../Service/user";

const InvestorProfile = ({ theme }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isInvestor = useSelector(selectIsInvestor);
  const companyName = useSelector(selectCompanyName);
  const [previewImage, setPreviewImage] = useState("");
  const [cropComplete, setCropComplete] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const dispatch = useDispatch();

  // console.log("companyName", companyName);

  // State for Professional Data
  const [professionalData, setProfessionalData] = useState({
    designation: loggedInUser?.designation || "",
    education: loggedInUser?.education || "",
    experience: loggedInUser?.experience || "",
    profilePicture: loggedInUser.profilePicture || "",
    fullName: loggedInUser?.firstName + " " + loggedInUser?.lastName || "",
    company: companyName,
    location: loggedInUser?.location || "Bangalore, India",
    industry: loggedInUser?.industry || "Nun",
    isInvestor: loggedInUser?.isInvestor || false,
  });
  console.log(loggedInUser?.industry);
  // State for isEditing
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch professional data
  useEffect(() => {
    if (isInvestor) {
      setProfessionalData((prev) => ({ ...prev, company: companyName }));
    } else {
      setProfessionalData((prev) => ({ ...prev, company: companyName }));
    }
  }, [companyName, isInvestor]);

  // Handle Text Change
  function handleTextChange(e) {
    let { name, value } = e.target;
    setProfessionalData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Handle File change
  function handleFileChange(e) {
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setCropComplete(false);
    // if (e.target.name === "image" && file.type.includes("image")) {
    setPreviewImage(objectUrl);
    //
    // }
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let editedData = {
      designation: professionalData.designation,
      education: professionalData.education,
      experience: professionalData.experience,
    };

    try {
      // if (selectedFile) {
      //   const profilePicture = await getBase64(selectedFile);
      //   editedData = { ...editedData, profilePicture: profilePicture };
      // }
      if (croppedImage) {
        // const profilePicture = await getBase64(croppedImage);
        const profilePicture = croppedImage;

        editedData = { ...editedData, profilePicture: profilePicture };
      }
      //   console.log("from Submit", editedData, editedCompanyName);
      const {
        data: { data },
      } = await updateUserAPI(editedData);
      console.log("data updateUserAPI", data);
      // Set new loggedInUser data
      dispatch(loginSuccess(data));
      // Set local state
      setProfessionalData((prev) => ({
        ...prev,
        designation: data?.designation,
        education: data?.education,
        experience: data?.experience,
        profilePicture: data?.profilePicture,
        fullName: data?.firstName + " " + data?.lastName,
        location: data?.location,
      }));

      if (isInvestor) {
        let editedCompanyName = {
          founderId: loggedInUser._id,
          companyName: professionalData.company,
        };
        const { data } = await postInvestorData(editedCompanyName);
        // console.log("post Investor", data);
        dispatch(updateUserCompany({ companyName: data.companyName }));
      } else {
        let editedCompanyName = {
          founderId: loggedInUser._id,
          company: professionalData.company,
        };
        const { data } = await postStartUpData(editedCompanyName);
        // console.log("post startup", data.company);
        dispatch(updateUserCompany({ company: data.company }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
      setLoading(false);
      setSelectedFile(null);
      setCropComplete(false);
      setPreviewImage("");
    }
  }
  return (
    <section
      className={`professional_info_section d-flex flex-column gap-3 p-2 px-md-4 py-4  shadow-sm ${
        theme === "investor" ? "rounded-2 border" : "rounded-2"
      }`}
    >
      {" "}
      <InvestorDetail
        theme={theme}
        professionalData={professionalData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        selectedFile={selectedFile}
        handleTextChange={handleTextChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
        previewImage={previewImage}
        cropComplete={cropComplete}
        setCropComplete={setCropComplete}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        detail={false}
      />
    </section>
  );
};

export default InvestorProfile;
