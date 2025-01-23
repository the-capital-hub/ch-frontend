import React, { useState } from "react";
import "./JoinWhatsAppGroupPopup.scss";

const JoinWhatsAppGroupPopup = ({ onClose, onJoin }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber.trim()) {
            setError("Please enter a phone number");
            return;
        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);
        try {
            await onJoin(phoneNumber);
            // The popup will be closed by the parent component after successful redirection
        } catch (error) {
            setIsLoading(false);
            setError("Failed to join. Please try again.");
        }
    };

    return (
        <div className="whatsapp-popup-overlay">
            <div className="whatsapp-popup">
                <button className="close-btn-wa" onClick={onClose} disabled={isLoading}>&times;</button>
                <h2>Join WhatsApp Group</h2>
                <p>Please enter your phone number to join the community WhatsApp group</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        maxLength={10}
                        disabled={isLoading}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Join Group'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinWhatsAppGroupPopup; 