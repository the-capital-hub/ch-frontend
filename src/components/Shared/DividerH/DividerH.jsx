export default function DividerH({ text }) {
  return (
    <div
      className="divider d-flex align-items-center"
      style={{ gridColumn: "1/-1" }}
    >
      <span
        className=""
        style={{
          flex: "1 1 0",
          opacity: "0.5",
          borderTop: "1px solid var(--darkMode-currentTheme)",
        }}
      ></span>
      <span className="px-3 my-3 fs-6 opacity-75">{text}</span>
      <span
        className=""
        style={{
          flex: "1 1 0",
          opacity: "0.5",
          borderTop: "1px solid var(--darkMode-currentTheme)",
        }}
      ></span>
    </div>
  );
}
