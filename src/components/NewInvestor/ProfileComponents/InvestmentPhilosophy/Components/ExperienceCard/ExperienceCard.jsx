import React from "react";

const EXPERIENCE = {
  companyName: "Company Name",
  location: "Location",
  experienceDuration: "Experience",
  role: "Role",
};

const EDUCATION = {
  schoolName: "Institution",
  location: "Location",
  passoutYear: "Graduation Year",
  course: "Specialization",
};

export default function ExperienceCard({ data, isExperience = true }) {
  // console.log(data);
  return (
    <div className="experience_card py-2 mt-1 row row-cols-1 row-cols-md-2">
      {isExperience && (
        <div className="img_container rounded d-flex align-items-center justify-content-center mx-auto col-6 col-md-2">
          <img
            className="rounded-circle"
            src={data?.logo}
            height={100}
            width={100}
            alt="Institution logo"
          />
        </div>
      )}
      <div className="description mt-1 mt-md-0 col-md-9 row row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div className="d-flex flex-column mb-1 mb-md-3">
          <p className="text-secondary mb-1">
            {isExperience ? EXPERIENCE.companyName : EDUCATION.schoolName}
          </p>
          <p className="m-0">
            {isExperience ? data?.companyName : data?.schoolName}
          </p>
        </div>
        <div className="d-flex flex-column mb-1 mb-md-3">
          <p className="text-secondary mb-1">
            {isExperience ? EXPERIENCE.location : EDUCATION.location}
          </p>
          <p className="m-0">{data?.location}</p>
        </div>
        <div className="d-flex flex-column mb-1 mb-md-3">
          <p className="text-secondary mb-1">
            {isExperience
              ? EXPERIENCE.experienceDuration
              : EDUCATION.passoutYear}
          </p>
          <p className="m-0">
            {isExperience ? data?.experienceDuration : data?.passoutYear}
          </p>
        </div>
        <div className="d-flex flex-column mb-1 mb-md-3">
          <p className="text-secondary mb-1">
            {isExperience ? EXPERIENCE.role : EDUCATION.course}
          </p>
          <p className="m-0">{isExperience ? data?.role : data?.course}</p>
        </div>
      </div>
    </div>
  );
}
