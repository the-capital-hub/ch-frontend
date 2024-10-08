import { Form } from "react-bootstrap";
import { useRef, useState } from "react";

export default function FormTextArea({
  name,
  label,
  defaultValue,
  wordLimit = null,
  controlId,
}) {
  const [alert, setAlert] = useState(false);
  const textRef = useRef();

  function handleTextAreaChange(e) {
    // auto resize
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + 2 + "px";

    // Enforce word limit
    if (!wordLimit) {
      return;
    }

    const { value } = e.target;
    let words = value.split(" ");
    if (words.length > wordLimit) {
      textRef.current.value = words.slice(0, words.length - 1).join(" ");
      setAlert(true);
    } else {
      setAlert(false);
      return;
    }
  }

  return (
    <Form.Group controlId={controlId} className="form-group">
      <Form.Label className="">{label}</Form.Label>
      <Form.Control
        as={"textarea"}
        rows={5}
        name={name}
        defaultValue={defaultValue}
        onChange={handleTextAreaChange}
        ref={textRef}
      />
      {wordLimit && (
        <em
          className={`py-2 m-0 text-danger ${alert ? "visible" : "invisible"}`}
        >
          You have exceeded word limit. Please use {wordLimit} words or less.
        </em>
      )}
    </Form.Group>
  );
}
