import React from "react";
import PersonProfile from "./PersonProfile";

export default function PersonProfileList({ theme, short, data }) {
  // Get from props or person fetch data here
  return (
    <div className="d-flex flex-column gap-3">
      {/* Loop Person Profile here */}
      {data?.map((person) => {
        return (
          <PersonProfile
            theme={theme}
            short={short}
            personData={person}
            key={person._id}
          />
        );
      })}
    </div>
  );
}
