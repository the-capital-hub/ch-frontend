import React, { useState, useEffect } from "react";
import "./OneLinkEditView.scss";
// import DollarRupeeImage from "../../../../../Images/Dollar_rupee.svg";
// import PramodSq from "../../../../../Images/Pramod.jpeg";
import OnePagePreviewCard from "../../../InvestorGlobalCards/OneLink/OnePagePreviewCard/OnePagePreviewCard";
import Table from "../../Table/Table";
import TeamCard from "../../../InvestorGlobalCards/OneLink/TeamCard/TeamCard";
// import FundAsking from "../../Table/FundAsking/FundAsking";
// import FundDeployment from "../../Table/FundDeployment/FundDeployment";
import {
  // Link,
  useNavigate,
} from "react-router-dom";
// import SmallProfileCard from "../../../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
// import OneLinkMarketSection from "../OneLinkMarketSection/OneLinkMarketSection";
// import OneLinkContactEdit from "./OneLinkContactEdit/OneLinkContactEdit";
import AfterSuccessPopUp from "../../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { useSelector, useDispatch } from "react-redux";
import {
  getStartupByFounderId,
  postStartUpData,
  updateUserById,
  addNotificationAPI,
} from "../../../../../Service/user";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getBase64 } from "../../../../../utils/getBase64";
// import camimg from "../../../../../Images/Camera.png";
import backIcon from "../../../../../Images/Chat/BackIcon.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { loginSuccess } from "../../../../../Store/features/user/userSlice";
import toast from "react-hot-toast";
// import achievement from "../../../../../Images/Investor/Achievements/img_1.png";
// import AchievementToast from "../../../../Toasts/AchievementToast/AchievementToast";
// import { achievementTypes } from "../../../../Toasts/AchievementToast/types";
import IconChevronBack from "../../../SvgIcons/IconChevronBack";

const OneLinkEditView = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const userId = loggedInUser._id;
  const [company, setCompany] = useState({});
  const [formData, setFormData] = useState({
    company: "",
    description: "",
    location: "",
    logo: "",
    keyFocus: "",
    socialLinks: "",
    TAM: "",
    SAM: "",
    SOM: "",
  });
  const [selectedLogo, setSelectedLogo] = useState(null);
  // const [imageData, setImageData] = useState(null);
  const [fundingAskRows, setFundingAskRows] = useState([
    { required: "", amount: "" },
  ]);
  const [roadMapRows, setRoadMapRows] = useState([{ date: "", milestone: "" }]);
  const [competitorData, setCompetitorData] = useState([{ name: "" }]);

  const initialData = {
    rows: [
      { label: "Revenue", values: [""] },
      { label: "Expense", values: [""] },
    ],
  };

  const [tableData, setTableData] = useState(initialData);

  const navigate = useNavigate();

  useEffect(() => {
    getStartupByFounderId(userId)
      .then(({ data }) => {
        setCompany(data);
        setFormData({
          company: data.company || "",
          description: data.description || "",
          logo: data.logo || "",
          keyFocus: data.keyFocus || "",
          location: data.location || "",
          socialLinks: data.socialLinks || [],
          TAM: data.TAM || "",
          SAM: data.SAM || "",
          SOM: data.SOM || "",
          startedAtDate: data.startedAtDate || "",
        });
        setFundingAskRows(data.fundingsAsk || fundingAskRows);
        setRoadMapRows(data.roadMap || roadMapRows);
        setCompetitorData(data.competitors || competitorData);
        setTableData(
          data.projections.length > 0 ? data.projections[0] : tableData
        );
      })
      .catch(() => setCompany({}));
  }, []);

  // useEffect(() => {
  //   // Fetch the image data from the URL
  //   fetch(company?.logo)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Create a URL for the blob data
  //       const blobUrl = URL.createObjectURL(blob);
  //       setImageData(blobUrl);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching image:", error);
  //     });
  // }, [company?.logo]);

  const handleInputChange = (field, event) => {
    const updatedValue = event.target.value;
    if (!updatedValue) return;
    setFormData({ ...formData, [field]: updatedValue });
  };

  const handleSocialLinkChange = (field, event) => {
    const updatedValue = event.target.value;
    const updatedSocialLinks = { ...formData.socialLinks };
    updatedSocialLinks[field] = updatedValue;
    setFormData({
      ...formData,
      socialLinks: updatedSocialLinks,
    });
  };

  const handleUpdate = (logo) => {
    if (logo) {
      formData.logo = logo;
    }
    postStartUpData({
      ...formData,
      founderId: loggedInUser._id,
    })
      .then(({ data }) => {
        setSelectedLogo(data.logo);
      })
      .catch((err) => console.log(err));
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector(".download_preview");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.display = "none";
    });
    html2canvas(element, {
      allowTaint: false,
      removeContainer: true,
      backgroundColor: "#ffffff",
      scale: window.devicePixelRatio,
      useCORS: true,
      windowWidth: "1400px",
    }).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pdf = new jsPDF("p", "mm", "a4");
      let position = 5;

      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${formData.company}.pdf`);
      buttons.forEach((button) => {
        button.style.display = "block";
      });
    });
  };

  const handlePreviewPDF = () => {
    const container = document.querySelector(".download_preview");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.display = "none";
    });
    html2canvas(container, {
      allowTaint: false,
      removeContainer: true,
      backgroundColor: "#ffffff",
      scale: window.devicePixelRatio,
      useCORS: true,
      windowWidth: "1400px",
    }).then((canvas) => {
      const contentDataURL = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pdf = new jsPDF("p", "mm", "a4");
      let position = 5;

      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const blob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
      buttons.forEach((button) => {
        button.style.display = "block";
      });
    });
  };

  const logoOnChangeHandler = async ({ target }) => {
    const logo = await getBase64(target.files[0]);
    console.log(target.files[0]);
    setFormData((prevForm) => {
      return {
        ...prevForm,
        logo: logo,
      };
    });
    handleUpdate(logo);
  };

  const addRow = () => {
    setFundingAskRows([...fundingAskRows, { required: "", amount: "" }]);
  };

  const addRodMapRow = () => {
    setRoadMapRows([...roadMapRows, { date: "", milestone: "" }]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...fundingAskRows];
    updatedRows.splice(index, 1);
    setFundingAskRows(updatedRows);
  };

  const deleteRoadMapRow = (index) => {
    const updatedRows = [...roadMapRows];
    updatedRows.splice(index, 1);
    setRoadMapRows(updatedRows);
  };

  const handleFundingAskInputChange = (index, field, value) => {
    const updatedRows = [...fundingAskRows];
    updatedRows[index][field] = value;
    setFundingAskRows(updatedRows);
  };

  const handleRoadMapInputChange = (index, field, value) => {
    const updatedRows = [...roadMapRows];
    updatedRows[index][field] = value;
    setRoadMapRows(updatedRows);
  };

  // Competitor Input Change
  const handleCompetitorInputChange = (index, value) => {
    const updatedCompetitorData = [...competitorData];
    updatedCompetitorData[index].name = value;
    setCompetitorData(updatedCompetitorData);
  };

  // Add Competitor
  const addCompetitor = () => {
    const updatedCompetitorData = [...competitorData, { name: "" }];
    setCompetitorData(updatedCompetitorData);
  };

  // Delete Competitor
  const deleteCompetitor = (index) => {
    const updatedCompetitorData = competitorData.filter((_, i) => i !== index);
    setCompetitorData(updatedCompetitorData);
  };

  const [fromSubmit, setFromSubmit] = useState(false);
  const [popupData, setPopupData] = useState("");

  const handleSubmit = async () => {
    postStartUpData({
      fundingsAsk: fundingAskRows,
      roadMap: roadMapRows,
      competitors: competitorData,
      projections: tableData,
      founderId: loggedInUser._id,
    })
      .then(({ data }) => {
        setPopupData("Changes saved");
        setFromSubmit(true);

        if (!loggedInUser.achievements.includes("6564689149186bca517cd0d1")) {
          const achievements = [...loggedInUser.achievements];
          achievements.push("6564689149186bca517cd0d1");
          const updatedData = { achievements };
          updateUserById(loggedInUser._id, updatedData)
            .then(({ data }) => {
              dispatch(loginSuccess(data.data));
              const notificationBody = {
                recipient: loggedInUser._id,
                type: "achievementCompleted",
                achievementId: "6564689149186bca517cd0d1",
              };
              addNotificationAPI(notificationBody)
                .then((data) => console.log("Added"))
                .catch((error) => console.error(error.message));

              toast.dismiss();
              // toast.custom((t) => (
              //   <AchievementToast type={achievementTypes.oneStopShop} />
              // ));
            })
            .catch((error) => {
              console.error("Error updating user:", error);
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* <div className="editview_container"> 
        <div className="col">
          <SmallProfileCard text={"Edit"} />
        </div>
        <div className="box_container px-3 px-lg-5 py-5 my-4"> 
       <section className="dollar_rupree">
            <img src={DollarRupeeImage} alt="image" />
          </section> 
       <div className="download_preview">
            <section className="company_description">
              <div
                className="mx-2 my-2 my-md-0"
                style={{ height: "120px", width: "120px" }}
              >
                <label htmlFor="logoImg" className="position-relative">
                  <img
                    src={selectedLogo || imageData}
                    alt="image"
                    style={{ height: "120px", width: "120px" }}
                    role="button"
                  />
                  <span
                    style={{ fontSize: "10px", left: "30%" }}
                    className="position-absolute top-50 text-white rounded-pill bg-dark py-1 px-2"
                  >
                    Update
                  </span>
                </label>
                <input
                  type="file"
                  value=""
                  id="logoImg"
                  name="logo"
                  onChange={logoOnChangeHandler}
                  accept=".jpg, .jpeg, .png, .webp, .svg"
                  hidden
                />
              </div>
              <div className="company_text text-center text-md-start">
                <h6>
                  <input
                    className="name_container fs-5 "
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e)}
                    onBlur={(e) => handleUpdate()}
                  />
                </h6>
                <h6>
                  <input
                    className="name_container "
                    value={formData.tagline}
                    onChange={(e) => handleInputChange("tagline", e)}
                    onBlur={(e) => handleUpdate()}
                  />
                </h6>
                <hr className="m-0" />
                <h6>
                  <textarea
                    className="description_container"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e)}
                    onBlur={(e) => handleUpdate()}
                  />
                </h6>
              </div>
            </section>

            <section className="card_section">
              <OnePagePreviewCard company={company} page={"oneLinkEdit"} />
            </section>

            <section className="market_section">
              <OneLinkMarketSection company={company} page={"oneLinkEdit"} />
            </section>

            <section className="table_section">
              <Table page={"oneLinkEditPage"} />
            </section>

            <section className="team_section">
              {company?.team?.map((team, index) => (
                <TeamCard
                  index={index + 1}
                  profile={team?.image}
                  name={team?.name}
                  designation={team?.designation}
                  company={company}
                  page={"oneLinkEdit"}
                />
              ))}
            </section>

            <section className="fund_asking_deployment">
              <div className="funding_divider">
                <FundAsking company={company} page={"oneViewEdit"} />
              </div>
              <div className="funding_divider">
                <OneLinkContactEdit
                  oneLink={company.oneLink}
                  page={"oneViewEdit"}
                />
              </div>
            </section>
          </div> 

      <section className="button_preview_download_section pdf-hidden">
            <div className="download_button_container">
              <button onClick={handlePreviewPDF}>Preview</button>
              <button className="download_button" onClick={handleDownloadPDF}>
                Download
              </button>
            </div>
          </section>
        </div>
      </div> */}
      <section className="one_link_edit_view_section w-100 p-3 rounded-4">
        <span
          className="back_img rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          title="Go Back"
          onClick={() => navigate(-1)}
        >
          {/* <img
            src={backIcon}
            alt="go back"
            width={20}
            height={20}
            onClick={() => navigate(-1)}
          /> */}
          <IconChevronBack width={25} height={25} color="var(--d-l-grey)" />
        </span>
        <div className="download_preview p-md-5 ">
          <section className=" img_company_data d-flex flex-column flex-md-row w-100 justify-content-between align-items-center gap-3">
            <div className="img_right ">
              <label htmlFor="logoImg" className="position-relative">
                <img
                  src={selectedLogo || company?.logo}
                  alt="Selected logo or previous logo"
                  role="button"
                />
                <span
                  className="position-absolute py-1 px-2 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    fontSize: "15px",
                    padding: "4px",
                    color: "var(--d-l-grey)",
                  }}
                >
                  Upload Company Logo
                </span>
              </label>
              <input
                type="file"
                value=""
                id="logoImg"
                name="logo"
                onChange={logoOnChangeHandler}
                accept=".jpg, .jpeg, .png, .webp, .svg"
                hidden
              />
            </div>
            <div className="compant_data d-flex flex-column gap-3 ">
              <div className="startup_Name_inp">
                <h5>Startup Name</h5>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-100 px-3"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e)}
                  onBlur={(e) => handleUpdate()}
                />
              </div>
              <div className="location_data_div d-flex flex-column flex-md-row gap-3 w-100 ">
                <div className="country  w-100 ">
                  <h5>City, Country</h5>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className=" px-3"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e)}
                    onBlur={(e) => handleUpdate()}
                  />
                </div>
                <div className="founded  w-100 ">
                  <h5>Founded Date</h5>
                  <input
                    type="date"
                    id="founded_date"
                    name="founded_date"
                    className=" px-3 w-100"
                    value={formData.startedAtDate}
                    onChange={(e) => handleInputChange("startedAtDate", e)}
                    onBlur={(e) => handleUpdate()}
                  />
                </div>
              </div>
              <div className="tags_inp">
                <h5>Tags</h5>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className=" px-3"
                  style={{ width: "100%" }}
                  value={formData.keyFocus}
                  onChange={(e) => handleInputChange("keyFocus", e)}
                  onBlur={(e) => handleUpdate()}
                />
              </div>
            </div>
          </section>
          <section className="link_section">
            <div className="web_link">
              <h5>Website Link</h5>
              <input
                type="text"
                id="website_link"
                name="website_link"
                className="w-100 px-3"
                value={formData.socialLinks?.website}
                onChange={(e) => handleSocialLinkChange("website", e)}
                onBlur={(e) => handleUpdate()}
              />
            </div>
            <h4>Social Links</h4>
            <div className="social_links d-flex flex-column flex-md-row justify-content-between gap-3">
              <div className="links w-100">
                <h5>Linkedin</h5>
                <input
                  type="text"
                  id="link_1"
                  name="link_1"
                  className="w-100 px-3"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange("linkedin", e)}
                  onBlur={(e) => handleUpdate()}
                />
              </div>

              <div className="links w-100">
                <h5>Twitter</h5>
                <input
                  type="text"
                  id="link_2"
                  name="link_2"
                  className="w-100 px-3"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange("twitter", e)}
                  onBlur={(e) => handleUpdate()}
                />
              </div>

              <div className="links w-100">
                <h5>Instagram</h5>
                <input
                  type="text"
                  id="link_3"
                  name="link_3"
                  className="w-100 px-3"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange("instagram", e)}
                  onBlur={(e) => handleUpdate()}
                />
              </div>
            </div>
          </section>
          <div className="about_company_section my-3">
            <h5>About Company</h5>
            <textarea
              type="text"
              className="m-0 fs-6 w-100 p-3"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e)}
              onBlur={(e) => handleUpdate()}
            />
          </div>
          <hr className="my-3" />
          <section className="card_section ">
            <OnePagePreviewCard company={company} page={"oneLinkEdit"} />
          </section>
          <h4>Market Size (in Billions $)</h4>
          <section className="market_size d-flex flex-column flex-md-row justify-content-between gap-3">
            <div className="market w-100">
              <h5>Total Addressable Market:</h5>
              <input
                type="text"
                id="total_addressable_market"
                name="total_addressable_market"
                className="w-100 px-3"
                placeholder="Enter here"
                value={formData.TAM}
                onChange={(e) => handleInputChange("TAM", e)}
                onBlur={(e) => handleUpdate()}
              />
            </div>

            <div className="market w-100">
              <h5>Service Addressable Market:</h5>
              <input
                type="text"
                id="service_addressable_market"
                name="service_addressable_market"
                className="w-100 px-3"
                placeholder="Enter here"
                value={formData.SAM}
                onChange={(e) => handleInputChange("SAM", e)}
                onBlur={(e) => handleUpdate()}
              />
            </div>

            <div className="market w-100">
              <h5>Service Obtainable Market:</h5>
              <input
                type="text"
                id="service_obtainable_market"
                name="service_obtainable_market"
                className="w-100 px-3"
                placeholder="Enter here"
                value={formData.SOM}
                onChange={(e) => handleInputChange("SOM", e)}
                onBlur={(e) => handleUpdate()}
              />
            </div>
          </section>
          <h4>Competitor</h4>
          <section className="competitor_social_link d-flex flex-column flex-md-row justify-content-between gap-3">
            {competitorData?.map((competitor, index) => (
              <div className="competitor_link w-100" key={index}>
                <h5>Competitor name {index + 1}</h5>
                <input
                  type="text"
                  value={competitor.name}
                  onChange={(e) =>
                    handleCompetitorInputChange(index, e.target.value)
                  }
                  className="w-100 px-3"
                />
                {index > 0 && (
                  <button
                    className="delete_row_btn delete_insideText"
                    onClick={() => deleteCompetitor(index)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                )}
              </div>
            ))}
          </section>
          <button onClick={addCompetitor} className="add_row_btn startup">
            + Add Competitor
          </button>
          <section className="table_section mt-4">
            <Table
              page={"oneLinkEditPage"}
              setTable={setTableData}
              data={tableData}
            />
          </section>
          <h4>Fund Asking</h4>
          <section className="fund_sking_section  d-flex flex-column  justify-content-between gap-3">
            {fundingAskRows?.map((row, index) => (
              <div
                className="d-flex flex-md-row flex-column w-100 gap-2"
                key={index}
              >
                <div className="fund_asking w-100">
                  <h5>Required For</h5>
                  <input
                    type="text"
                    value={row.required}
                    onChange={(e) =>
                      handleFundingAskInputChange(
                        index,
                        "required",
                        e.target.value
                      )
                    }
                    className="w-100 px-3"
                  />
                </div>

                <div className="fund_asking w-100">
                  <h5>Amount</h5>
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) =>
                      handleFundingAskInputChange(
                        index,
                        "amount",
                        e.target.value
                      )
                    }
                    className="w-100 px-3"
                  />
                </div>
                {index > 0 && (
                  <button
                    className="delete_row_btn"
                    onClick={() => deleteRow(index)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                )}
              </div>
            ))}
          </section>
          <button onClick={addRow} className="add_row_btn startup">
            + Add Row
          </button>
          <hr />

          <h4>Roadmap</h4>
          <section className="roadmap_section d-flex flex-column justify-content-between gap-3">
            {roadMapRows?.map((row, index) => (
              <div
                className="d-flex flex-md-row flex-column w-100 gap-2"
                key={index}
              >
                <div className="Roadmap w-100">
                  <h5>Date</h5>
                  <input
                    type="date"
                    name={`date_${index}`}
                    value={row.date}
                    onChange={(e) =>
                      handleRoadMapInputChange(index, "date", e.target.value)
                    }
                    className="w-100 px-3"
                  />
                </div>

                <div className="Roadmap w-100">
                  <h5>Milestone</h5>
                  <input
                    type="text"
                    name={`milestone_${index}`}
                    value={row.milestone}
                    onChange={(e) =>
                      handleRoadMapInputChange(
                        index,
                        "milestone",
                        e.target.value
                      )
                    }
                    className="w-100 px-3"
                  />
                </div>

                {index > 0 && (
                  <button
                    className="delete_row_btn"
                    onClick={() => deleteRoadMapRow(index)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                )}
              </div>
            ))}
          </section>
          <button className="add_row_btn startup" onClick={addRodMapRow}>
            + Add Row
          </button>
          <hr />
          <section className="team_section d-flex  flex-row gap-3">
            {company?.team?.map((team, index) => (
              <TeamCard
                index={index + 1}
                profile={team?.image}
                name={team?.name}
                designation={team?.designation}
                company={company}
                page={"oneLinkEdit"}
              />
            ))}
          </section>
          <button
            className="save_btn btn-lg d-block mx-auto mt-3"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        <section className="button_preview_download_section pdf-hidden">
          <div className="download_button_container">
            <button onClick={handlePreviewPDF}>Preview</button>
            <button className="download_button" onClick={handleDownloadPDF}>
              Download
            </button>
          </div>
        </section>
        {fromSubmit && (
          <AfterSuccessPopUp
            withoutOkButton
            onClose={() => setFromSubmit(!fromSubmit)}
            successText={popupData}
          />
        )}
      </section>
      {/* <Toaster /> */}
    </>
  );
};

export default OneLinkEditView;
