// QAComponent.jsx
import React from 'react';
import { FaUserCircle, FaRegBookmark, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import './ThoughtsQA.scss';

const QAComponent = () => {
  return (
    <div className="qa-page">
      {/* Left Side - Questions */}
      <div className="questions-sidebar">
        <h2 className="sidebar-title">Questions</h2>
        <div className="question-preview">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <div className="user-details">
              <span className="username">Suresh Kumar</span>
              <span className="follow-text">· Follow</span>
            </div>
            <button className="more-options">···</button>
          </div>
          <p className="preview-text">
            How are rapidly evolving regulatory environments, particularly around data privacy,
            cybersecurity, and environmental standards...
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Question Section */}
        {/* <div className="question-section">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <div className="user-details">
              <span className="username">Suresh Kumar</span>
              <span className="follow-text">· Follow</span>
            </div>
          </div>
          
          <p className="question-text">
            How are rapidly evolving regulatory environments, particularly around data privacy,
            cybersecurity, and environmental standards, influencing the strategies and operations
            of industries like technology, finance, and healthcare, and what are the long-term
            implications of these regulations for companies trying to balance compliance with
            innovation?
          </p>
        </div> */}

        {/* Answers Section */}
        <div className="answers-section">
          <h3 className="answers-title">Answers</h3>
          
          {/* Answer Input */}
          <div className="answer-input-container">
            <div className="input-header">
              <FaUserCircle className="user-icon" />
              <p className="input-placeholder">Type your answer here</p>
            </div>
            <div className="input-actions">
              <FaPaperPlane className="send-icon" />
            </div>
          </div>

          {/* Answer Items */}
          {[
            {
              name: "Rahul Kumar",
              content: "In the face of rapid advancements in financial technologies (fintech), such as blockchain, digital currencies, and decentralized finance (DeFi), how are traditional financial institutions responding to the threat of disruption while still leveraging these technologies to enhance their own services, and what are the potential risks and rewards of this transition for both consumers and investors With the growing demand for personalized medicine and the rise of biotechnologies such"
            },
            {
              name: "John Smith",
              content: "In the realm of artificial intelligence (AI) and machine learning (ML), how are organizations adapting to the increasing automation of processes and decision-making, and what are the key considerations for ensuring transparency and accountability in AI-driven systems"
            },
            {
              name: "John Smith",
              content: "In the realm of artificial intelligence (AI) and machine learning (ML), how are organizations adapting to the increasing automation of processes and decision-making, and what are the key considerations for ensuring transparency and accountability in AI-driven systems"
            },
            {
              name: "John Smith",
              content: "In the realm of artificial intelligence (AI) and machine learning (ML), how are organizations adapting to the increasing automation of processes and decision-making, and what are the key considerations for ensuring transparency and accountability in AI-driven systems"
            },
            {
              name: "Suresh Kumar",
              content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas."
            }
          ].map((answer, index) => (
            <div key={index} className="answer-item">
              <div className="user-info">
                <FaUserCircle className="user-icon" />
                <div className="user-details">
                  <span className="username">{answer.name}</span>
                  <span className="follow-text">· Follow</span>
                </div>
              </div>
              
              <p className="answer-text">
                {answer.content}
              </p>
              
              <div className="interaction-bar">
                <div className="action-buttons">
                  <button className="action-button">
                    <BiLike />
                    <span>Like</span>
                  </button>
                  <button className="action-button">
                    <BiCommentDetail />
                    <span>Comment</span>
                  </button>
                </div>
                <FaRegBookmark className="bookmark-icon" />
              </div>
            </div>
          ))}

          {/* View More Button */}
          <div className="view-more">
            <button className="view-more-button">
              <span>View more answers</span>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAComponent;