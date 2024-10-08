import { useEffect } from "react";
import ComingSoon from "../../ComingSoon/ComingSoon";
import "./Customer.scss";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../Store/features/design/designSlice";

const Customer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Customer | The Capital Hub";
    dispatch(setPageTitle("Customer"));
  }, [dispatch]);
  return (
    <MaxWidthWrapper>
      <div className="customer_container">
        <div className="content-70">
          <ComingSoon />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Customer;
