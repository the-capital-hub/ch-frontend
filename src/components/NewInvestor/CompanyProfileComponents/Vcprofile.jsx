import React from "react";
import { useNavigate } from "react-router-dom";  
import VcCard from "../../../components/Shared/VcCard/VcCard";

export default function VcProfileList({data, theme}) {
    const navigate = useNavigate();  
    console.log("VCPROFILE",data[1]);
    const handleVcClick = (vcId) => {
        if (theme === "investor") {
            console.log("Investor clicked");
            navigate(`/investor/vc-profile/${vcId}`);
            return; 
        }
        navigate(`/vc-profile/${vcId}`); 
    };

    return (
        <div className="d-flex flex-column gap-3">
            {data.length === 0 ? (
                <div className="container bg-white d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm">
                    No VCs found
                </div>
            ) : (
                data.map((vc) => (    
                <div key={vc._id} onClick={() => handleVcClick(vc._id)} style={{ cursor: 'pointer' }}>
                        <VcCard vc={vc} />
                    </div>
                ))
            )}
        </div>
    );
}
