import { useEffect } from "react";
import ComingSoon from "../../ComingSoon/ComingSoon";
import "./Investors.scss";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

const Investors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Investors | The Capital Hub";
    dispatch(setPageTitle("Investors"));
  }, [dispatch]);
  return (
    <MaxWidthWrapper>
      <div className="investor_container">
        <div className="content-70">
          <ComingSoon />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Investors;
