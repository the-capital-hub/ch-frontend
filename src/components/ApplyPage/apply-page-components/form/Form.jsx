import Button from "../button/Button";
import "./Form.scss";

export default function Form() {
  const options = ["Fundraising", "Development", "Consulting", "Investing"];

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <fieldset className="form__fieldset">
          <legend>Form Filling</legend>
          {/* Name */}
          <div className="form__input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          {/* Email */}
          <div className="form__input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          {/* Phone */}
          <div className="form__input">
            <label htmlFor="phone">Mobile Number</label>
            <input type="tel" id="phone" name="phone" required />
          </div>

          {/* Selection */}
          <div className="form__input">
            <label htmlFor="selection">Choose One</label>
            <select name="selection" id="selection" defaultValue={options[0]}>
              {options.map((option, index) => {
                return (
                  <option value={option} key={`${index}${option}`}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Description */}
          <div className="form__textarea">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="submit-btn">
            <Button type={"submit"} isPill={true} text={"Submit"} />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
