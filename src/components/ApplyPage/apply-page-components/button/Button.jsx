export default function Button({ type, text, isPill }) {
  return (
    <button type={type} className="primary-btn" data-pill={isPill}>
      {text}
    </button>
  );
}
