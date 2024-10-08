// src/components/PhilosophyDetails.js
import React, { useState } from "react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { useOutletContext } from "react-router-dom";
import { PhilosophyQuestions } from "../../../constants/Investor/ProfilePage";
import { IoIosArrowDown } from "react-icons/io";
import "./investorOne.scss";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <IoIosArrowDown className="chevron-down" />
      </>
    }
  />
);

export default function PhilosophyDetails({ canEdit, theme }) {
  const { investor } = useOutletContext();
  const { philosophy, sectorPreferences } = investor;

  const [openItems, setOpenItems] = useState([]); // State to track open accordion items

  const handleAccordionChange = (key) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(key)
        ? prevOpenItems.filter((item) => item !== key)
        : [...prevOpenItems, key]
    );
  };

  return (
    <div>
      <Accordion transition transitionTimeout={250}>
        {Object.keys(PhilosophyQuestions).map((question, index) => (
          <AccordionItem
            header={PhilosophyQuestions[question]}
            key={index}
            onClick={() => handleAccordionChange(question)}
            initialEntered={openItems.includes(question)}
          >
            <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              {philosophy[question]}
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
