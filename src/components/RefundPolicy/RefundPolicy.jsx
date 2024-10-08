import React from "react";
import "./Refund.scss";

const RefundPolicy = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container privacy_container">
          <section className="title_section">
            <h1 className="term_title">
            Cancellation & Refund Policy

            </h1>
          </section>

          <section className="accept_the_term_section">
            <p>Last updated on 01-07-2024 12:35:51</p>
            <h2 className="heading_with_line_one">
            CHANNING AND BARRETT INDUSTRIES PRIVATE LIMITED believes in helping its customers as
            far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </h2>
          </section>

          <section className="accept_the_term_section">
            {/* <h2 className="heading_with_line_two">1. Data We Collect</h2> */}
            <ul>
            <li><b>We don't provide any refund</b></li>
              {/*<li>
                <b>Cancellations will be considered only</b> if the request is made immediately after placing the order.
                However, the cancellation request may not be entertained if the orders have been communicated to the
                vendors/merchants and they have initiated the process of shipping them.
              </li>*/}
              {/*<li>
               <b> CHANNING AND BARRETT INDUSTRIES PRIVATE LIMITED does not accept</b> cancellation
                requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the
                customer establishes that the quality of product delivered is not good.
              </li>
              <li>
                    In case of receipt of damaged or defective items please report the same to our Customer Service team.
                    The request will, however, be entertained once the merchant has checked and determined the same at his
                    own end. This should be reported within 2 Days days of receipt of the products. In case you feel that the
                    product received is not as shown on the site or as per your expectations, you must bring it to the notice of
                    our customer service within 2 Days days of receiving the product. The Customer Service Team after
                    looking into your complaint will take an appropriate decision.
              </li>
              <li>
                In case of complaints regarding products that come with a warranty from manufacturers, please refer
                the issue to them. In case of any Refunds approved by the CHANNING AND BARRETT INDUSTRIES
                PRIVATE LIMITED, it’ll take 16-30 Days days for the refund to be processed to the end customer.
              </li>*/}
            </ul>
          </section>

         
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
