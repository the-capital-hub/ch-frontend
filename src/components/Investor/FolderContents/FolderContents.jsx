import { useEffect, useState } from "react";
import "./FolderContents.scss";
import { useNavigate, useParams } from "react-router-dom";
import HalfbendCard from "../InvestorGlobalCards/Documentation/HalfbendCard/HalfbendCard";
import { getUserById } from "../../../Service/user";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../Store/features/design/designSlice";

const FolderContents = () => {
  const { route } = useParams();
  const { username } = useParams();
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Documents | The Capital Hub";
    dispatch(setPageTitle("Documents"));
  }, [dispatch]);

  useEffect(() => {
    getUserById(username)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => setUser([]));
  }, [username]);
  const title = route[0].toUpperCase() + route.slice(1);
  console.log(route);
  let pageTitle;

  switch (title) {
    case "Legal and compliance":
      pageTitle = "Legal and Compliance";
      break;
    case "Pitchdeck":
      pageTitle = "Pitch Deck";
      break;
    case "Kycdetails":
      pageTitle = "KYC Details";
      break;
    case "Business":
      pageTitle = "Business";
      break;
    default:
      pageTitle = title;
      break;
  }
  return (
    <MaxWidthWrapper>
      <div className="folderContents">
        <div className="w-100 d-flex justify-content-center align-items-center border-bottom px-2 py-2">
          <button className="btn  border mx-3" onClick={() => navigate(-1)}>
            Back
          </button>
          <h1 className="flex-grow-1">{pageTitle}</h1>
        </div>
        <HalfbendCard folderName={route} userId={userId} />
      </div>
    </MaxWidthWrapper>
  );
};

export default FolderContents;
