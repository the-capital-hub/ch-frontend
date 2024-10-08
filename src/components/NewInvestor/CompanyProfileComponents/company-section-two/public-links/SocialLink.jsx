import "./SocialLink.scss";

export default function SocialLink({ icon, name, socialLinks }) {
  return (
    <a
      href={socialLinks[name]}
      className="social__link text-capitalize"
      style={{ width: "fit-content" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={icon} alt={name} />
      {name}
    </a>
  );
}
