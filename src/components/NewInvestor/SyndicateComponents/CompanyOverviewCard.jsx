export default function CompanyOverviewCard({
  heading,
  icon,
  iconAlt,
  text,
  fontBase,
  theme
}) {
  // All styles based on fontBase are to make this component suitable for larger font.
  // Used in LiveDeals.jsx

  return (
    <div
      className={`link__container d-flex flex-column ${
        fontBase ? "gap-2 me-lg-4" : "gap-1"
      }`}
    >
      <p style={{color:theme === "dark"?"#fff":"black"}}>{heading}</p>
      <a
        href="# "
        target="_blank"
        className={`overview__link d-flex align-items-center rounded-pill ${
          fontBase ? "py-2 px-3 gap-2" : "py-1 px-2 gap-1"
        }`}
      >
        <img
          src={icon}
          alt={iconAlt}
          style={fontBase ? { width: "20px", height: "20px" } : {}}
        />
        <p className={`${fontBase ? "fs-6 fw-light" : ""}`} style={{color:theme === "dark"?"#fff":"black"}}>{text}</p>
      </a>
    </div>
  );
}
