import "./SimpleCard.scss";

const SimpleCard = ({ title, text, amount }) => {
  return (
    <div className="simpleCard">
      <fieldset className="">
        <legend className="px-1 ms-2">{title}</legend>
        <p>{text}</p>
      </fieldset>
    </div>
  );
};

export default SimpleCard;
