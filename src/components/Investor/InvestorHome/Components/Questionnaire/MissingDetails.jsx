import React, { useEffect, useState } from "react";
import { getQuestionCountAPI } from "../../../../../Service/user";
import Questionnaire from "./Questionnaire";

export default function MissingDetails({ isInvestor = false }) {
  // State for question count
  const [countData, setCountData] = useState(null);
  const [refetch, setRefetch] = useState(false);

  // Fetch Questions count
  useEffect(() => {
    async function fetchQuestionsCount() {
      try {
        const { data } = await getQuestionCountAPI();
        // console.log("count", data);
        setCountData(data);
      } catch (error) {
        console.error("Error fetching count:", error);
        throw error;
      }
    }

    fetchQuestionsCount();
  }, [refetch]);

  // Handle Refetch count
  function handleRefetch() {
    setRefetch(!refetch);
  }

  return (
    <div className=" rounded-4 shadow-sm lh-1 d-flex flex-column">
      {/*{countData?.total ? (
        <button
          id="missingDetails"
          className={`btn rounded-4 fs-5 py-3 ${
            isInvestor ? "border" : "border-0"
          } `}
          data-bs-toggle="offcanvas"
          data-bs-target="#questionnaireOffCanvas"
          aria-controls="offcanvasTop"
          style={{
            color: isInvestor ? "#000" : "#fd5901",
            backgroundColor: isInvestor ? "#d3f36b" : "var(--white-to-grey)",
          }}
        >
          Add missing details {countData && `(${countData.total})`}
        </button>
      ) : (
        ""
      )}*/}

      {/* OffCanvas for questionnaire */}
      <Questionnaire
        countData={countData}
        setCountData={setCountData}
        handleRefetch={handleRefetch}
        isInvestor={isInvestor}
      />
    </div>
  );
}
