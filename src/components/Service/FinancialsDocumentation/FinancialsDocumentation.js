import React, { useEffect } from "react";
import "./FinancialsDocumentation.scss";
import serviceFourIcon from "../../../Images/service/Group 15407.svg";

import listIcon from "../../../Images/ListDot.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";

const FinancialsDocumentation = () => {
  useEffect(() => {
    document.title = "Financial Documentation Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container financial-document_main_container">
        <div className="container">
          <Link to={"/service"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_fund">
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>

            <div className="title_and_image">
              <img src={serviceFourIcon} alt="image" />
              <h2>FINANCIAL DOCUMENTATION</h2>
            </div>

            <p className="mt-4">
              You've likely heard of financial projections, but you may not know
              exactly what they are or why they're so important.
              <br />
              <br />
              Financial projections are one of the most crucial elements of any
              business plan, and they can have a big impact on your business's
              success. In short, financial projections are future estimates of
              your company's financial performance. They help you plan for the
              future and make informed decisions about where to allocate your
              resources.
              <br />
              <br />
              There are a few different types of financial projections, but the
              most common are sales projections, expense projections, cash flow
              projections, and Exit strategy.
              <br />
              <br />
              Sales projections estimate future sales revenue, while expense
              projections estimate future expenses. <br />
              <br />
              Cash flow projections estimate future cash flow, which is the
              money that comes in and out of your business. <br />
              <br />
              Making accurate financial projections is critical for any
              business, but it can be especially important for startups. That's
              because startups often have limited history and may not have much
              data to work with when making projections. <br />
              <br />
              Fortunately, there are a few different ways to make financial
              projections for startups, using historical data, using market
              analysis, and using financial models.
            </p>
          </section>

          <section className="list_section">
            <ol>
              <h2>Our process :</h2>
              <li>
                <div>
                  Initial Consultation and Understanding of Business Model
                </div>{" "}
              </li>

              <li>
                <div>Study Of Past Financials And Industry Benchmark</div>{" "}
              </li>

              <li>
                <div>Preparation Of Draft Financial Model</div>{" "}
              </li>

              <li>
                <div>
                  Review And Fine Tuning of Assumptions With You Over Calls
                </div>{" "}
              </li>

              <li>
                <div>Valuation, Cap Table And Exit Strategy</div>{" "}
              </li>
            </ol>

            <ul>
              <h2>What's included in the financial projections :</h2>
              <li>
                <img src={listIcon} alt="image" />
                <div>Sales Forecast Report </div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Income Statement Projection</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Cash Flow Statements</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Balance Sheet Projection</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Financial Ratios</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Valuation Report</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Sensitivity Analysis Report </div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Cap Table</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Exit strategy</div>
              </li>
            </ul>
          </section>
          <section className="title_description">
            <h2>Why work with us?</h2>
            <div>
              <h3>Expert Team</h3>
              <p>We have prepared 1000+ Financial Models.</p>
            </div>

            <div>
              <h3>Research-driven Model</h3>
              <p>The assumptions are backed by industry research.</p>
            </div>

            <div>
              <h3>Customized Model</h3>
              <p>No cookie-cutter approach is 100% custom developed for you.</p>
            </div>

            <div>
              <h3>Advanced features</h3>
              <p>
                Valuation, Sensitivity Analysis, Cap Table, Ratio Analysis &amp;
                Competitor Benchmarking.
              </p>
            </div>

            <div>
              <h3>Start-up Friendly Pricing</h3>
              <p>
                We are not the cheapest but we do understand the constraints of
                a startup.
              </p>
            </div>

            <div>
              <h3>5 rounds of changes</h3>
              <p>
                You can request 5 rounds of changes without any additional cost.
              </p>
            </div>

            <div>
              <h3>One Month Free Support</h3>
              <p>We offer one month of free support for our services.</p>
            </div>
            <div>
              <h3>Easy to modify</h3>
              <p>
                Fully editable file in which you can easily modify assumptions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FinancialsDocumentation;
