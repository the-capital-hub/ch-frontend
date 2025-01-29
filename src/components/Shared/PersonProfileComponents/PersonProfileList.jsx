import React, { useEffect, useState, useRef } from "react";
import PersonProfile from "./PersonProfile";
import { motion } from "framer-motion";

export default function PersonProfileList({ theme, short, data: initialData }) {
  const [visibleProfiles, setVisibleProfiles] = useState([]); // Track visible profiles
  const [data, setData] = useState(initialData); // Add local state for data
  const containerRef = useRef(null);

  // Update local state when prop changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleFounderUpdate = (updatedFounder) => {
    if (data) {
      const updatedData = data.map(founder => 
        founder._id === updatedFounder._id ? updatedFounder : founder
      );
      setData(updatedData); // Update the local state with new data
    }
  };

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

    const profileElements = containerRef.current.querySelectorAll(".person-profile-item");

    profileElements.forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el); // Observe each profile
    });

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, [data]);

  return (
    <div className="d-flex flex-column gap-3" ref={containerRef}>
      {/* Loop Person Profile here */}
      {data?.map((person, index) => {
        const isVisible = visibleProfiles.includes(index); // Check if profile is visible
        return (
          <motion.div
            className="person-profile-item"
            key={person._id}
            initial={{ opacity: 0, y: 50 }} // Initial animation state
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Animate when visible
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
          >
            <PersonProfile 
              theme={theme} 
              short={short} 
              personData={person} 
              onFounderUpdate={handleFounderUpdate}
              isAdmin={true}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
