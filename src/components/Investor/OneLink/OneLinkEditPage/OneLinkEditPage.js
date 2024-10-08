import React, { useEffect } from "react";
import "./OneLinkEditPage.scss";
import OneLinkEditView from "./OneLinkEditView/OneLinkEditView";
import MaxWidthWrapper from "../../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

const OneLinkEditPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Edit OneLink | The Capital Hub";
    dispatch(setPageTitle("Edit OneLink"));
  }, [dispatch]);
  return (
    <MaxWidthWrapper>
      <div className="editpage_container">
        <div className="row">
          <OneLinkEditView />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default OneLinkEditPage;
