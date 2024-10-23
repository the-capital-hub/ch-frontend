import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";  
import VcCard from "../../../components/Shared/VcCard/VcCard";
import { motion } from "framer-motion"; // Import Framer Motion for animations

export default function VcProfileList({ data, theme }) {
    const navigate = useNavigate();
    const [visibleProfiles, setVisibleProfiles] = useState([]); // Track visible profiles
    const containerRef = useRef(null); // Ref to container

    const handleVcClick = (vcId) => {
        if (theme === "investor") {
            navigate(`/investor/vc-profile/${vcId}`);
        } else {
            navigate(`/vc-profile/${vcId}`); 
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

        const cardElements = containerRef.current.querySelectorAll(".vc-profile-item");

        cardElements.forEach((el, index) => {
            el.dataset.index = index;
            observer.observe(el); // Observe each VC profile card
        });

        return () => {
            observer.disconnect(); // Cleanup observer on unmount
        };
    }, [data]);

    return (
        <div className="d-flex flex-column gap-3" ref={containerRef}>
            {data.length === 0 ? (
                <div className="container bg-white d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm">
                    No VCs found
                </div>
            ) : (
                data.map((vc, index) => {
                    const isVisible = visibleProfiles.includes(index); // Check if the profile is visible
                    return (
                        <motion.div
                            key={vc._id}
                            className="vc-profile-item"
                            initial={{ opacity: 0, y: 50 }} // Initial animation state
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Animate when visible
                            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
                            onClick={() => handleVcClick(vc._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <VcCard vc={vc} />
                        </motion.div>
                    );
                })
            )}
        </div>
    );
}
