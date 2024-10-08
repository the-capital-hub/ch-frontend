import { useEffect } from "react";
import "./WriteBlog.scss";
import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";

function WriteBlog() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Write a blog | The Capital Hub";
    dispatch(setPageTitle("Write blog"));
  }, []);
  return (
    <MaxWidthWrapper>
      <div className="write-blog_container">
        <ComingSoon />
      </div>
    </MaxWidthWrapper>
  );
}

export default WriteBlog;
