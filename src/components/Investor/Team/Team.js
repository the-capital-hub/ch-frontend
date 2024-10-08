import React, { useEffect } from "react";
import "./Team.scss";
import ComingSoon from "../../ComingSoon/ComingSoon";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

const Team = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Team | The Capital Hub";
    dispatch(setPageTitle("Team"));
  }, [dispatch]);
  return (
    <MaxWidthWrapper>
      <div className="team_container">
        <div className="content-70">
          <ComingSoon />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Team;
