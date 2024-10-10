import React, { useState, useEffect } from "react";
import MyInvestmentCard from "../../../pages/Investor/InvestorCards/MyInvestmentCard/MyInvestmentCard";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorById, postInvestorData } from "../../../Service/user";
import "./EditModalContent.scss";

const EditModalContent = ({ dataArray, isInterests, setInvestedStartups, setMyInterests, isPastInvestments, setPastInvestments }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [index, setIndex] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataArray && dataArray.length) {
      setCompanies(dataArray);
    }
  }, [dataArray]);

  const handleEditClick = (selectedCompany, idx) => {
    setIndex(idx);
    setEditingCompany(selectedCompany);
  };

  const updateCompanies = (newCompanyData) => {
    setCompanies((prevCompanies) => {
      let companiesList = prevCompanies.map((comp, idx) => {
        if (idx === index) {
          return { ...newCompanyData };
        }
        return comp;
      });
      return companiesList;
    });
  };

  const handleDelete = async (idx) => {
    try {
      const { data: investor } = await getInvestorById(loggedInUser?.investor);
      if (!isInterests && !isPastInvestments) {
        investor.startupsInvested.splice(idx, 1);
        const { data: response } = await postInvestorData(investor);
        setCompanies(response.startupsInvested);
        setInvestedStartups(response.startupsInvested);
      } else if (isPastInvestments) {
        investor.pastInvestments.splice(idx, 1);
        const { data: response } = await postInvestorData(investor);
        setCompanies(response.pastInvestments);
        setPastInvestments(response.pastInvestments);
      } else {
        investor.myInterests.splice(idx, 1);
        const { data: response } = await postInvestorData(investor);
        setCompanies(response.myInterests);
        setMyInterests(response.myInterests);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit__modal__body">
      <div className="current_list d-flex flex-column gap-4 border rounded-4 p-3">
        <h5 className="m-0">My Investments</h5>
        <div className="d-flex flex-column gap-3">
          {companies.map((company, idx) => (
            <div
              className="border rounded-4 p-2 d-flex justify-content-between align-items-center"
              key={company.name}
            >
              <img
                src={company.logo || company.data?.logo}
                alt={company.name || company.data?.company}
                style={{ width: "50px", cursor: "pointer" }}
                onClick={() => handleEditClick(company, idx)}
              />
              <h6
                className=""
                style={{ cursor: "pointer" }}
                onClick={() => handleEditClick(company, idx)}
              >
                {company.name || company.data?.company}
              </h6>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-start gap-4 border rounded-4 p-3 pb-5">
        {editingCompany && (
          <MyInvestmentCard
            company={editingCompany}
            isInterests={isInterests}
            editMode={true}
            updateCompanies={updateCompanies}
            index={index}
            setInvestedStartups={setInvestedStartups}
            setMyInterests={setMyInterests}
            isPastInvestments={isPastInvestments}
            setPastInvestments={setPastInvestments}
          />
        )}
      </div>
    </div>
  );
};

export default EditModalContent;
