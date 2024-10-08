import IconCard from "../../shared-components/icon-card/IconCard";

export default function KeyFocus({ tags }) {
  // Can fetch data for company tags here
  return (
    <div
      className="key__focus d-flex flex-column gap-4"
      style={{ color: "var(--d-l-grey)" }}
    >
      <h6 className="div__heading">Key Focus</h6>
      <div className="tags__container d-flex flex-wrap gap-4">
        {tags.map((tag) => {
          return <IconCard key={tag} text={tag} isPill={true} />;
        })}
      </div>
    </div>
  );
}
