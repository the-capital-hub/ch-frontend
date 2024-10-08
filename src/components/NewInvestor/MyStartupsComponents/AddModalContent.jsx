import { BsFillCloudUploadFill } from "react-icons/bs";
import "./AddModalContent.scss";
import { useState } from "react";
import { getBase64 } from "../../../utils/getBase64";
import {
  addStartupInvested,
  addMyInterest,
  searchStartUps,
  addPastInvestments,
  // uploadLogo,
} from "../../../Service/user";
import { useSelector } from "react-redux";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { useRef } from "react";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
export default function AddModalContent({
  isInterests = false,
  isPastInvestments = false,
  setInvestedStartups,
  setMyInterests,
  setPastInvestments,
}) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [interestLogo, setInterestLogo] = useState(null);
  const [pastInvestmentLogo, setPastInvestmentLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyImage: "",
    name: "",
    description: "",
    equity: "",
    ask: "",
    commitment: "",
    companyId: "",
    companyOnelink: "",
  });
  const [companies, setCompanies] = useState([]);
  const closeButton = useRef();
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.description && formData.description.length > 400) {
      alert("Maximum allowed characters for description is 400.");
      return;
    }
    setLoading(true);

    try {
      if (isInterests) {
        const companyLogo = selectedCompanyId
          ? logo
          : await getBase64(interestLogo);
        const newInterestData = {
          logo: companyLogo,
          name: formData.name,
          ask: formData.ask,
          commitment: formData.commitment,
          investedEquity: formData.equity,
          companyId: formData.companyId,
          companyOnelink: formData.companyOnelink,
          isExisting: selectedCompanyId ? true : false,
        };
        const response = await addMyInterest(
          loggedInUser?.investor,
          newInterestData
        );
        console.log(response.data.myInterests);
        setMyInterests(response.data.myInterests);
      } else if (isPastInvestments) {
        const companyLogo = selectedCompanyId
          ? logo
          : await getBase64(pastInvestmentLogo);
        const newPastinvestments = {
          logo: companyLogo,
          name: formData.name,
          description: formData.description,
          companyId: formData.companyId,
          companyOnelink: formData.companyOnelink,
          isExisting: selectedCompanyId ? true : false,
        };
        const response = await addPastInvestments(
          loggedInUser?.investor,
          newPastinvestments
        );
        console.log(response.data.pastInvestments);
        setPastInvestments(response.data.pastInvestments);
      } else {
        const companyLogo = selectedCompanyId
          ? logo
          : await getBase64(formData.companyImage);
        const newStartUpData = {
          logo: companyLogo,
          name: formData.name,
          description: formData.description,
          investedEquity: formData.equity,
          companyId: formData.companyId,
          companyOnelink: formData.companyOnelink,
          isExisting: selectedCompanyId ? true : false,
        };
        const response = await addStartupInvested(
          loggedInUser?.investor,
          newStartUpData
        );
        setInvestedStartups(response.data.startupsInvested);
        closeButton.current.click();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInterestLogo = (e) => {
    setInterestLogo(e.target.files[0]);
  };

  const handlePastInvestmentlogoChange = (e) => {
    setPastInvestmentLogo(e.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
      setLogo(null);
    } else {
      if (name === "name") {
        searchStartUps(value)
          .then(({ data }) => {
            setCompanies(data);
            //console.log(data);
          })
          .catch(() => {
            setCompanies([]);
          });
        setSelectedCompanyId(null);
        setDisabled(false);
        setLogo(null);
      } else {
        setCompanies([]);
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCompanySelection = (
    companyId,
    companyName,
    description,
    companyOnelink,
    companyLogo
  ) => {
    setSelectedCompanyId(companyId);
    // const searchInput = document.querySelector(".");
    // searchInput.value = companyName;
    setFormData({
      ...formData,
      name: companyName,
      description: description,
      companyId: companyId,
      companyOnelink: companyOnelink,
      companyImage: "",
    });
    setInterestLogo("");
    setLogo(companyLogo);
    setDisabled(true);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="border rounded-4 p-3">
        <h5 className="green_underline">Add new: </h5>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          {isInterests ? (
            <div className="upload__image mt-4">
              <input
                type="file"
                name="interestLogo"
                id="interestLogo"
                accept="image/*"
                className="visually-hidden"
                onChange={handleInterestLogo}
                disabled={disabled}
              />
              <label htmlFor="interestLogo" className="text-black fw-lighter">
                <div className="upload__label p-2">
                  <BsFillCloudUploadFill
                    style={{
                      fontSize: "1.5rem",
                      color: "rgba(140, 90, 201, 1)",
                    }}
                  />
                  <p>Upload Image</p>
                  {interestLogo && (
                    <img
                      src={URL.createObjectURL(interestLogo)}
                      alt="Selected Interest's media"
                      style={{ maxWidth: "100%", maxHeight: "70px" }}
                    />
                  )}
                  {logo && (
                    <img
                      src={logo}
                      alt="Selected logo"
                      style={{ maxWidth: "100%", maxHeight: "70px" }}
                    />
                  )}
                </div>
              </label>
            </div>
          ) :
            isPastInvestments ? (
              <div className="upload__image mt-4">
                <input
                  type="file"
                  name="pastInvestmentLogo"
                  id="pastInvestmentLogo"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handlePastInvestmentlogoChange}
                  disabled={disabled}
                />
                <label htmlFor="pastInvestmentLogo" className="text-black fw-lighter">
                  <div className="upload__label p-2">
                    <BsFillCloudUploadFill
                      style={{
                        fontSize: "1.5rem",
                        color: "rgba(140, 90, 201, 1)",
                      }}
                    />
                    <p>Upload Image</p>
                    {pastInvestmentLogo && (
                      <img
                        src={URL.createObjectURL(pastInvestmentLogo)}
                        alt="Selected Interest's media"
                        style={{ maxWidth: "100%", maxHeight: "70px" }}
                      />
                    )}
                    {logo && (
                      <img
                        src={logo}
                        alt="Selected logo"
                        style={{ maxWidth: "100%", maxHeight: "70px" }}
                      />
                    )}
                  </div>
                </label>
              </div>
            ) :
              (
                <div className="upload__image mt-4">
                  <input
                    type="file"
                    name="companyImage"
                    id="companyImage"
                    accept="image/*"
                    className="visually-hidden"
                    onChange={handleInputChange}
                    disabled={disabled}
                  />
                  <label htmlFor="companyImage" className="text-black fw-lighter">
                    <div className="upload__label p-2">
                      <BsFillCloudUploadFill
                        style={{
                          fontSize: "1.5rem",
                          color: "rgba(140, 90, 201, 1)",
                        }}
                      />
                      <p>Upload Image</p>
                      {formData.companyImage && (
                        <img
                          src={URL.createObjectURL(formData.companyImage)}
                          alt="Selected company media"
                          style={{ maxWidth: "100%", maxHeight: "70px" }}
                        />
                      )}
                      {logo && (
                        <img
                          src={logo}
                          alt="Selected logo"
                          style={{ maxWidth: "100%", maxHeight: "70px" }}
                        />
                      )}
                    </div>
                  </label>
                </div>
              )}
          <div className="">
            <input
              type="text"
              name="name"
              id="name"
              placeholder={`company name...`}
              className="p-2 w-100 rounded-3 modal__input"
              onChange={handleInputChange}
              value={formData.name}
            />
            <div className="company_exsisting__container">
              {companies.length !== 0 && (
                <div className="suggestion">
                  {companies.map((company, index) => (
                    <div
                      className={`suggestion-item ${selectedCompanyId === company._id ? "active" : ""
                        }`}
                      key={index}
                      onClick={() =>
                        handleCompanySelection(
                          company._id,
                          company.company,
                          company.description,
                          company.oneLink,
                          company.logo
                        )
                      }
                    >
                      <img
                        src={company.logo || DefaultAvatar}
                        alt={`Company Logo ${index}`}
                        className="suggestion-logo"
                      />
                      {company.company}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="">
            <textarea
              name={`${isInterests ? "ask" : "description"}`}
              id={`${isInterests ? "ask" : "description"}`}
              rows={4}
              className="p-2 w-100 rounded-3 modal__input"
              placeholder={`${isInterests ? "ask..." : "description..."}`}
              onChange={handleInputChange}
              value={isInterests ? formData.ask : formData.description}
              disabled={isInterests ? false : disabled}
            ></textarea>
          </div>

          {isInterests ? (
            <div className="">
              <input
                type="text"
                name="commitment"
                id="commitment"
                placeholder={`commitment...`}
                className="p-2 w-100 rounded-3 modal__input"
                onChange={handleInputChange}
              />
            </div>
          ) : (
            ""
          )}

          {!isPastInvestments &&
            <div className="">
              <input
                type="number"
                name="equity"
                id="equity"
                min={0}
                max={100}
                placeholder={`equity...`}
                className="p-2 w-100 rounded-3 modal__input"
                onChange={handleInputChange}
              />
            </div>
          }

          <button
            type="submit"
            className="btn btn-investor w-auto mx-auto fs-6"
          >
            {loading ? (
              <SpinnerBS
                colorClass={"text-dark"}
                spinnerSizeClass="spinner-border-sm"
              />
            ) : (
              "Save"
            )}
          </button>
        </form>
        <button
          data-bs-dismiss="modal"
          style={{ display: "none" }}
          ref={closeButton}
        ></button>
      </div>
    </div>
  );
}
