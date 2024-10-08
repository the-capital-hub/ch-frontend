import "./Filters.scss";

export default function Filters({ filterLabels, isSearch = true }) {
  return (
    <div className="search__filters__container d-flex flex-column-reverse flex-xl-row gap-4 align-items-center my-4 my-xl-3">
      <div className="filter__list d-flex flex-column align-items-center flex-sm-row flex-sm-wrap gap-4 pe-lg-4">
        {filterLabels.map((filter, index) => {
          return (
            <button
              key={`${filter}`}
              style={{
                outline: "none",
                border: "none",
                lineHeight: "0",
                width: "fit-content",
              }}
              className="bg-white fs-5 fw-normal rounded-pill shadow-sm filter-btn"
            >
              {filter}
            </button>
          );
        })}
      </div>
      {isSearch ? (
        <button
          className="fs-5 fw-normal rounded-pill shadow-sm filter-btn"
          style={{
            background: "rgba(211, 243, 107, 1)",
            outline: "none",
            border: "none",
            lineHeight: "0",
            width: "fit-content",
          }}
        >
          Filters
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
