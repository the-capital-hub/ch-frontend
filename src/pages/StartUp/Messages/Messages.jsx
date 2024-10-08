import { useEffect } from "react";
import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import "./Messages.scss";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

function Messages() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Messages | The Capital Hub";
    dispatch(setPageTitle("Messages"));
  }, [dispatch]);
  return (
    <MaxWidthWrapper>
      <div className="messages_container">
        <ComingSoon />
      </div>
    </MaxWidthWrapper>
  );
}

export default Messages;
