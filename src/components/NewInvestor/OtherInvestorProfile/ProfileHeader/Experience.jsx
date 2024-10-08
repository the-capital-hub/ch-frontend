import React from "react";
import companyLogo from "../../../../Images/dummy/companyLogo.png";

export default function Experience() {
  return (
    <div className="experience bg-white p-4 rounded-4 border shadow-sm profile_container">
      <h4 className="h4">Experience</h4>
      <div className="single_experience row row-cols-1 row-cols-md-2 gx-2">
        <div className="col-12 col-md-1 image">
          <img
            src={companyLogo}
            alt="company logo"
            width={60}
            height={60}
            className="rounded-circle p-1 border"
          />
        </div>
        <div className="col-12 col-md-11 ps-md-4">
          <h5 className="h5">Data Science</h5>
          <h6 className="h6">The capital hub</h6>
          <p className="m-0 text-secondary font_12">
            Jun 2022 - Present · 1 yr 4 mos
          </p>
          <p className="m-0 text-secondary font_12">
            Bangalore, Karnataka, India
          </p>
          <p className="mt-2 font_14">
            Skills: Data Visualization · Statistical Modeling · Machine Learning
            Algorithms · Datasets · Pattern Recognition · Data Mining ·
            Artificial Intelligence (AI) · Big Data · Neural Networks ·
          </p>
        </div>
      </div>
    </div>
  );
}
