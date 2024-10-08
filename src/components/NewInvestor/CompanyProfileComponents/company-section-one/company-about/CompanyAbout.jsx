import "./CompanyAbout.scss";

export default function CompanyAbout({
  about,
  vision,
  mission,
  noOfEmployees,
}) {
  return (
    <>
      <article className="company__about d-flex flex-column gap-4 flex-lg-row gap-lg-0 mt-2">
        <h6 className="div__heading">About the Company:</h6>
        <p className="about__text">{about || "NA"}</p>
      </article>
      <article className="company__about d-flex flex-column gap-4 flex-lg-row gap-lg-0 mt-2">
        <h6 className="div__heading">No of Employees:</h6>
        <p className="about__text">{noOfEmployees|| "NA"}</p>
      </article>
      {vision && (
        <article className="company__about d-flex flex-column gap-4 flex-lg-row gap-lg-0 mt-2">
          <h6 className="div__heading">Vision:</h6>
          <p className="about__text">{vision|| "NA"}</p>
        </article>
      )}
      {mission && (
        <article className="company__about d-flex flex-column gap-4 flex-lg-row gap-lg-0 mt-2">
          <h6 className="div__heading">Mission:</h6>
          <p className="about__text">{mission|| "NA"}</p>
        </article>
      )}
    </>
  );
}
