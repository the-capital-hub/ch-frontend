import "./IconCard.scss";

export default function IconCard({ src, alt, text, isPill }) {
  return (
    <div
      className={`iconCard__container d-flex align-items-center gap-1  ${
        isPill ? "pill fs-6" : ""
      } `}
    >
      {src ? <img src={src} alt={alt} className="" /> : ""}
      <p className="icon__text">{text}</p>
    </div>
  );
}
