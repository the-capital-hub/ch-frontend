import React, { useEffect, useState, useRef } from "react";
import InvestorProfile from "./InvestorProfile";
import { motion } from "framer-motion";

export default function InvestorProfileList({ theme, short, data }) {
  const [visibleProfiles, setVisibleProfiles] = useState([]); // Track visible profiles
  const containerRef = useRef(null);

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

    const profileElements = containerRef.current.querySelectorAll(".profile-item");

    profileElements.forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el); // Observe each profile
    });

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [data]);

  return (
    <div className="profile-list-wrapper d-flex flex-column gap-3" ref={containerRef}>
      {data?.map((person, index) => {
        const isVisible = visibleProfiles.includes(index); // Check if profile is visible
        return (
          <motion.div
            className="profile-item"
            key={person._id}
            initial={{ opacity: 0, y: 50 }} // Initial animation state
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Animate when visible
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
          >
            <InvestorProfile theme={theme} short={short} personData={person} />
          </motion.div>
        );
      })}
    </div>
  );
}
