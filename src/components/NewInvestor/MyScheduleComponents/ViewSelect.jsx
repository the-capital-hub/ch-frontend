export default function ViewSelect({ view, setView }) {
  return (
    <div
      className="view__selector d-flex gap-2 px-2 py-3 rounded-3"
      style={{ backgroundColor: "var(--bs-gray-200)" }}
    >
      {/* Day */}
      <button
        id="day"
        className={`view__btn border-0 px-3 py-1 rounded-3 text-capitalize bg-transparent ${
          view === "day" ? " active__view" : ""
        } `}
        onClick={() => setView("day")}
      >
        day
      </button>

      {/* Week */}
      <button
        id="week"
        className={`view__btn border-0 px-3 py-1 rounded-3 text-capitalize bg-transparent ${
          view === "week" ? " active__view" : ""
        } `}
        onClick={() => setView("week")}
      >
        week
      </button>

      {/* Month */}
      <button
        id="month"
        className={`view__btn border-0 px-3 py-1 rounded-3 text-capitalize bg-transparent ${
          view === "month" ? " active__view" : ""
        } `}
        onClick={() => setView("month")}
      >
        month
      </button>
    </div>
  );
}
