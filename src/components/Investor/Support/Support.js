import "./Support.scss";
import ComingSoon from "../../ComingSoon/ComingSoon";
import { useEffect } from "react";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

const Support = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Support | The Capital Hub";
    dispatch(setPageTitle("Support"));
  }, [dispatch]);

  return (
    <MaxWidthWrapper>
      <div className="support_container">
        <div className="content-70">
          <ComingSoon />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Support;
