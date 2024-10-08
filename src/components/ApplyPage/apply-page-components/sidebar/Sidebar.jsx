import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="aside">
      <h3>Related</h3>
      <ul className="aside__list">
        <li className="aside__list__item">About Y Combinator</li>
        <li className="aside__list__item">Founder Ethics</li>
        <li className="aside__list__item">Frequently Asked Questions</li>
        <li className="aside__list__item">Requests for Startups</li>
      </ul>
    </aside>
  );
}
