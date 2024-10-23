import React, { useState, useEffect, useRef } from "react";
import CompanyProfile from "./CompanyProfile";
import { motion } from "framer-motion"; // Import Framer Motion for animations

export default function CompanyProfileList({ isStartup, data, pageName, show, companyDelete }) {
  const [visibleProfiles, setVisibleProfiles] = useState([]); // Track visible profiles
  const containerRef = useRef(null); // Ref to container

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleProfiles((prev) => [...prev, Number(index)]);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the component is visible
    );

    const profileElements = containerRef.current.querySelectorAll(".company-profile-item");

    profileElements.forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el); // Observe each company profile
    });

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [data]);

  return (
    <div className="d-flex flex-column gap-3" ref={containerRef}>
      {data?.map((company, index) => {
        const isVisible = visibleProfiles.includes(index); // Check if profile is visible
        return (
          <motion.div
            key={company._id}
            className="company-profile-item"
            initial={{ opacity: 0, y: 50 }} // Initial animation state
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Animate when visible
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
          >
            <CompanyProfile
              short
              startup={`${isStartup ? "true" : "false"}`}
              companyData={company}
              pageName={pageName}
              show={show}
              companyDelete={companyDelete}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
