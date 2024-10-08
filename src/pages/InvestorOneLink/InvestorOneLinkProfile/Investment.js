import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { getInvestorById, postInvestorData } from "../../../Service/user";
import { CiSaveUp2 } from "react-icons/ci";
import {
  selectIsInvestor,
  selectUserCompanyData,
  selectUserInvestor,
  updateUserCompany,
} from "../../../Store/features/user/userSlice";
import { CiEdit } from "react-icons/ci";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";

const Investment = ({ canEdit, loading }) => {
  const theme = useSelector(selectTheme);
  const userInvestor = useSelector(selectUserInvestor);
  const isInvestor = useSelector(selectIsInvestor);
  const userCompanyData = useSelector(selectUserCompanyData);
  const [edit, setEdit] = useState("");
  const [companyData, setCompanyData] = useState({
    age: "",
    revenue: [],
    investmentRange: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInvestor && !userCompanyData) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          setCompanyData(data);
          console.log("Fetched company data:", data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setCompanyData(userCompanyData);
      console.log("Using existing company data:", userCompanyData);
    }
  }, [isInvestor, userInvestor, userCompanyData]);

  useEffect(() => {
    setCompanyData(userCompanyData);
    console.log("Updated company data from Redux store:", userCompanyData);
  }, [userCompanyData]);

  function formatNumber(value) {
    if (typeof value !== "number") return "NA";
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + " Crore";
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2) + " Lakh";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + " K";
    }
    return value.toString();
  }

  function handleTextChange(e) {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleRecentInvestmentChange(e) {
    const { value } = e.target;
    setCompanyData((prev) => {
      const updatedRevenue = [...prev.revenue];
      if (updatedRevenue.length > 0) {
        updatedRevenue[updatedRevenue.length - 1] = {
          ...updatedRevenue[updatedRevenue.length - 1],
          amount: value,
        };
      } else {
        updatedRevenue.push({ amount: value, date: new Date() });
      }
      return {
        ...prev,
        revenue: updatedRevenue,
      };
    });
  }

  function handleAverageInvestmentChange(e) {
    const value = e.target.value;
    setCompanyData((prev) => ({
      ...prev,
      investmentRange: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedData = {
        ...companyData,
        revenue: companyData.revenue.map((r, index) =>
          index === companyData.revenue.length - 1
            ? {
                amount: parseInt(companyData.revenue[index].amount),
                date: new Date(),
              }
            : r
        ),
        age: parseInt(companyData.age),
      };
      console.log("Payload to be sent:", updatedData); // Debugging log
      const { data } = await postInvestorData(updatedData);
      dispatch(updateUserCompany(data));
      setEdit("");
    } catch (error) {
      console.log(error);
    }
  }

  const recentInvestmentAmount =
    companyData.revenue.length > 0
      ? companyData.revenue[companyData.revenue.length - 1].amount
      : "NA";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          background: theme === "dark" ? "#22262c" : "#f5f5f5",
          padding: "10px",
          borderRadius: "0.37rem",
          maxWidth: "25rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(211, 243, 107, 1)",
            marginBottom: "5px",
          }}
        >
          <p
            className="typography"
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              marginBottom: "5px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            Recent Investment
          </p>
          {canEdit && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(edit === "recent" ? "" : "recent")}
            >
              <CiEdit
                style={{
                  color: theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",
                }}
              />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {canEdit && edit === "recent" ? (
            <input
              name="revenue"
              value={
                companyData.revenue.length > 0
                  ? companyData.revenue[companyData.revenue.length - 1].amount
                  : ""
              }
              onChange={handleRecentInvestmentChange}
            />
          ) : (
            <p
              style={{
                color: theme === "dark" ? "#fff" : "#000",
                marginBottom: "0",
              }}
            >
              {recentInvestmentAmount !== "NA"
                ? formatNumber(recentInvestmentAmount)
                : "NA"}
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          background: theme === "dark" ? "#22262c" : "#f5f5f5",
          padding: "10px",
          borderRadius: "0.37rem",
          maxWidth: "25rem",
          width: "100%",
          margin: "0 5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(211, 243, 107, 1)",
            marginBottom: "5px",
          }}
        >
          <p
            className="typography"
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              marginBottom: "5px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            Average Recent Investments
          </p>
          {canEdit && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(edit === "average" ? "" : "average")}
            >
              <CiEdit
                style={{
                  color: theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",
                }}
              />
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {canEdit && edit === "average" ? (
            <select
              name="averageInvestment"
              value={companyData.investmentRange}
              onChange={handleAverageInvestmentChange}
            >
              <option value="2.5 - 5 Lakhs">2.5 - 5 Lakhs</option>
              <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
              <option value="10 - 15 Lakhs">10 - 15 Lakhs</option>
              <option value="15 - 20 Lakhs">15 - 20 Lakhs</option>
            </select>
          ) : (
            <p
              style={{
                color: theme === "dark" ? "#fff" : "#000",
                marginBottom: "0",
              }}
            >
              {companyData.investmentRange || "NA"}
            </p>
          )}
        </div>
      </div>
      <div
        style={{
          background: theme === "dark" ? "#22262c" : "#f5f5f5",
          padding: "10px",
          borderRadius: "0.37rem",
          maxWidth: "25rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(211, 243, 107, 1)",
            marginBottom: "5px",
          }}
        >
          <p
            className="typography"
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              marginBottom: "5px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            Avg Age of Startup
          </p>
          {canEdit && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEdit(edit === "age" ? "" : "age")}
            >
              <CiEdit
                style={{
                  color: theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",
                }}
              />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {canEdit && edit === "age" ? (
            <input
              name="age"
              value={companyData.age}
              onChange={handleTextChange}
            />
          ) : (
            <p
              style={{
                color: theme === "dark" ? "#fff" : "#000",
                marginBottom: "0",
              }}
            >
              {companyData.age ? `Age ${companyData.age}` : "NA"}
            </p>
          )}
        </div>
      </div>
      {canEdit && edit && (
        <>
          <button
            className="btn ms-2 d-flex align-items-center gap-1"
            onClick={handleSubmit}
            style={{
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#D3F36B";
              e.target.style.color = "BLACK";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "";
              e.target.style.color = "";
            }}
          >
            {loading ? (
              <SpinnerBS spinnerSizeClass="spinner-border-sm" />
            ) : (
              <>
                Save <CiSaveUp2 />
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Investment;
