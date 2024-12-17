import React from "react";
import "./PitchDays.scss"; // Create a corresponding SCSS file for styles
import { IoCalendarOutline } from "react-icons/io5";
import { FiCopy, FiTrash2 } from "react-icons/fi";
const PitchDays = () => {
  const cards = [
    { title: "Pitch Day 1", duration: 45, price: 200, bookings: ["a","b","c"], isPrivate: false },
    { title: "Pitch Day 2", duration: 60, price: 300, bookings: ["a","b","c","a","b","c"], isPrivate: true },
    { title: "Pitch Day 3", duration: 90, price: 0, bookings: ["a","b","c","a","b","c","a","b","c"], isPrivate: false },
    { title: "Pitch Day 4", duration: 30, price: 150, bookings: [], isPrivate: true },
  ];

  // Function to generate random descriptions and headings
  const getRandomDescription = () => {
    const descriptions = [
      "Exciting opportunities await!",
      "Join us for an insightful day.",
      "Network with industry leaders.",
      "Discover innovative pitches."
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 156 + 100); // Red value between 100-255
    const g = Math.floor(Math.random() * 156 + 100); // Green value between 100-255
    const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100-255
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getRandomHeading = (index) => `Pitch Day ${index + 1}`;

  // New function to generate random time, price, and bookings
  const getRandomEventDetails = () => {
    const duration = Math.floor(Math.random() * 120) + 30; // Random duration between 30 and 150 mins
    const price = Math.floor(Math.random() * 1000); // Random price between 0 and 1000
    const bookings = Math.floor(Math.random() * 100); // Random bookings between 0 and 100
    const isPrivate = Math.random() < 0.5; // Randomly decide if the event is private
    return { duration, price, bookings, isPrivate };
  };

  return (
    <div className="pitch-days-container">
      <h1>Pitch Days</h1>
      <div className="events-grid">
        {cards.map((event, index) => (
          <div
            key={index}
            className="event-card"
            style={{ backgroundColor: getRandomLightColor() }} // Apply random light color
          >
            <div className="coming-soon-banner" style={{ opacity: 0.5 }}>
              Coming Soon
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <div className="event-meta">
                <div className="leftTime">
                  <span>
                    <IoCalendarOutline size={20} />
                  </span>{" "}
                  &nbsp;&nbsp;
                  <span>{event.duration} mins</span> &nbsp;&nbsp;
                  <span className="separator">|</span> &nbsp;&nbsp;
                  <span>{event.isPrivate ? "Private" : "Public"}</span>
                </div>
                <div className="leftRight">
                  {event.price > 0 ? (
                    <div className="price-tag">
                      <span className="new-price">₹{event.price.toFixed(0)}</span>
                    </div>
                  ) : (
                    <div className="price-tag">
                      <b>Free</b>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="event-actions">
              <div className="action-buttons">
                <button className="copy-btn" disabled>
                  <FiCopy />
                  Copy Link
                </button>
                <button className="delete-btn" disabled>
                  <FiTrash2 /> Delete
                </button>
              </div>
              <div className="bookings-count">
                {event.bookings.length}{" "}
                {event.bookings.length === 1 ? "Booking" : "Bookings"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchDays;