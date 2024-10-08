import React, { useEffect } from "react";
import "./CompliancesDeligence.scss";
import serviceSixIcon from "../../../Images/service/Group 15404.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";

const CompliancesDeligence = () => {
  useEffect(() => {
    document.title = "Compliance Diligence Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container complience_main_container">
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
              <img src={serviceSixIcon} alt="image" />
              <h2>COMPLIANCES AND DUE DILIGENCE</h2>
            </div>

            <p className="mt-4">
              The Capital HUB supports startups with compliance and DD services
              as part of their fundraising journey. The Capital HUB extensive
              services to incorporate startups, startup India registration, and
              due diligence.
            </p>
          </section>
          <section className="title_text_description ">
            <h1 className="underline_title">Company Registration</h1>
            <p>
              Our Pvt Ltd Registration Packages Includes
              <br /> DIN and DSC <br />
              Drafting of MoA & AoA <br />
              Government Stamp duty <br />
              Company Incorporation Certificate
              <br />
              Company PAN and TAN
              <br /> Certificate of commencement of business
            </p>
          </section>

          <section className="list_section">
            <ul>
              <h1 className="element_underline_one">
                Elements of Due Diligence in M&A Transactions
              </h1>
              <p>
                A comprehensive due diligence program will review and analyze
                several key aspects of the business. Typically, these areas are:
              </p>
              <li>
                <div>Commercial due diligence;</div>{" "}
              </li>

              <li>
                <div>Legal due diligence;</div>{" "}
              </li>

              <li>
                <div>Financial due diligence;</div>{" "}
              </li>

              <li>
                <div>Management due diligence;</div>{" "}
              </li>

              <li>
                <div>Other</div>{" "}
              </li>
            </ul>
          </section>

          <section className="list_section commercial_due_deligence_section">
            <ul>
              <h1 className="element_underline_two">
                Commercial due diligence
              </h1>
              <p>
                Commercial due diligence (CDD) seeks to understand the seller’s
                commercial prospects based on a detailed analysis of the
                company’s business and the broader industry(s) in which it
                operates. This review provides the purchaser with an insight
                into the credibility of the company’s forecasts.
                <br />
                While the specifics of CDD will always be tailored to the unique
                circumstances of the seller’s business, common aspects of CDD
                include:
              </p>
              <li>
                <div>
                  Analyzing the industry both in terms of its historical and
                  forecast growth rates and profitability levels;{" "}
                </div>{" "}
              </li>

              <li>
                <div>
                  Understanding broad industry cycles and trends and what the
                  current and possible future opportunities and threats may be;
                </div>{" "}
              </li>

              <li>
                <div>
                  Analyzing the seller’s competitors and understanding the
                  strengths and weaknesses of the seller’s strategy against both
                  existing and possible future competitors;{" "}
                </div>{" "}
              </li>

              <li>
                <div>
                  {" "}
                  Engaging with key customers and understanding their levels of
                  satisfaction with the seller’s products & services;{" "}
                </div>{" "}
              </li>

              <li>
                <div>
                  Reviewing the regulatory environment and the likelihood and
                  possible impact of regulatory change; and{" "}
                </div>{" "}
              </li>
              <li>
                <div>
                  Understanding other areas such as the seller’s product mix,
                  pricing power, supply chain, and so on.
                </div>
              </li>
            </ul>
          </section>

          <section className="list_section">
            <ul>
              <h1 className="element_underline_three">Legal Due Diligence</h1>
              <p>
                The scope and emphasis of legal due diligence (LDD) will very
                much depend on the specifics of the seller’s business and the
                areas of legal risk that have been identified by the buyer and
                their legal advisors.
                <br />
                For example, if a seller operated in, say, the aged care sector,
                a key area of LDD would be around the company’s current and
                historical compliance with the onerous regulatory obligations of
                that specific industry.
                <br />
                Nevertheless, there are common areas of LDD that apply to most
                companies. These include a review of the following:
              </p>
              <li>
                <div>
                  Corporate documents such as certificates of incorporation,
                  shareholders’ agreements, etc.;{" "}
                </div>{" "}
              </li>

              <li>
                <div>
                  Key contracts with customers, suppliers, partners, etc.{" "}
                </div>{" "}
              </li>

              <li>
                <div>Employment agreements etc. </div>{" "}
              </li>

              <li>
                <div>
                  Intellectual property such as patents, trademarks, etc.
                </div>{" "}
              </li>

              <li>
                <div>
                  Financial arrangements such as loans, guarantees, etc.;{" "}
                </div>{" "}
              </li>
              <li>
                <div>Property ownership and lease agreements; </div>
              </li>
              <li>
                <div>Regulatory compliance, licenses, etc.</div>
              </li>
              <li>
                <div>Insurance certificates and claims history</div>
              </li>
            </ul>
          </section>

          <section className="list_section">
            <ul>
              <h1 className="element_underline_four">
                Financial Due Diligence
              </h1>
              <p>
                The role of financial due diligence (FDD) is to provide an
                acquirer with a level of comfort around the integrity of the
                financial information provided by the seller, particularly in
                relation to the seller’s financial performance and position.
                <br />
                Those charged with undertaking FDD will engage with the seller
                to better understand the historical and forecast financial
                performance of the business and the accounting and financial
                systems that the business has in place
                <br />
                At the beginning of the due diligence process, the FDD team will
                formally seek a range of information and material from the
                seller including annual reports, audit files (if available),
                management accounts, tax returns, business plans and forecasts,
                board papers, and so on.
                <br />
                <br />
                Key areas of the FDD report will include:
              </p>
              <li>
                <div>An analysis of the company’s historical performance</div>{" "}
              </li>

              <li>
                <div>A review of the company’s current financial position</div>{" "}
              </li>

              <li>
                <div>
                  An analysis of the company’s forecasts and the reasonableness
                  of underlying assumptions{" "}
                </div>{" "}
              </li>

              <li>
                <div>
                  An analysis of future working capital and capital expenditure
                  requirements
                </div>{" "}
              </li>

              <li>
                <div>
                  A review of the adequacy of employee provisions and
                  entitlements
                </div>{" "}
              </li>
              <li>
                <div>A review of the company’s taxation arrangements; and </div>
              </li>
              <li>
                <div>
                  An analysis of the adequacy of accounting controls, systems,
                  and oversight.
                </div>
              </li>
            </ul>
          </section>

          <section className="list_section">
            <ul>
              <h1 className="element_underline_five">
                Management Due Diligence
              </h1>
              <p>
                As part of the due diligence process, an acquirer will conduct a
                review of the company’s management team to determine its
                strengths and weaknesses, assess whether there are any gaps in
                skills and experience, and also consider the extent of
                key-person risk.
                <br /> <br />
                Another more intangible consideration will be trying to assess
                the prevailing corporate culture within the seller’s business
                and whether it will be relatively easy to integrate management
                and staff into the new business and what the challenges of doing
                so might be.
              </p>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default CompliancesDeligence;
