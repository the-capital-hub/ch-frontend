import { useSelector } from "react-redux";
import "./FilterBySelect.scss";
import { selectTheme } from "../../../Store/features/design/designSlice";

function FilterBySelect({ name, label, onChange, options, value }) {
  const theme = useSelector(selectTheme)
  return (
    <div className="filter_by_select">
      <label style={{ marginLeft: "0.5rem",color:theme==="dark"?"#fff":"#000" }}>{label}</label>
      <div
        style={{
          paddingRight: "1rem",
          borderRadius: "10px",
        }}
        className="select"
      >
        <select
          name={name}
          id={label}
          onChange={onChange}
          value={value}
          style={{ paddingRight: "" }}
        >
          <option value={""} hidden={!value}>
            {!value ? label : "None"}
          </option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBySelect;
