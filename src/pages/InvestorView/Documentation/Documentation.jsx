import { useEffect, useState } from "react";
import { getUserById } from "../../../Service/user";
// import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import { Card } from "../../../components/InvestorView";
import "./Documentation.scss";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
	Business,
	KYC,
	Legal,
	Pitch,
	GreenPitch,
} from "../../../Images/StartUp/Documentaion";
import { getFoldersApi, getPdfData } from "../../../Service/user";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import MobileOneLinkNavbar from "../../../components/Shared/MobileOnelinkNavbar/MobileOneLinkNavbar";
import OnelinkPitch from "../../../components/NewInvestor/OnelinkPitch/OnelinkPitch";

const Documentation = () => {
	const navigate = useNavigate();
	const { username } = useParams();
	const { userId } = useParams();
	const [user, setUser] = useState({});
	useEffect(() => {
		document.title = "Documentation - OneLink | The Capital Hub";
	}, []);
	const [loading, setLoading] = useState(false);

  const [folderName, setFolderName] = useState([]);
  const [folderCounts, setFolderCounts] = useState({});

  const getFolders = () => {
    setLoading(true);
    getFoldersApi(userId)
      .then((data) => {
        setFolderName(data.data);
        // Fetch counts for each folder
        Promise.all(
          data.data.map(async (folder) => {
            try {
              const response = await getPdfData(userId, folder);
              return { [folder]: response.data.length };
            } catch (error) {
              console.error(`Error fetching count for ${folder}:`, error);
              return { [folder]: 0 };
            }
          })
        )
          .then((results) => {
            const counts = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setFolderCounts(counts);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching folder counts:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


	useEffect(() => {
		getFolders();
	}, []);

	useEffect(() => {
		getUserById(username, userId)
			.then(({ data }) => {
				setUser(data);
			})
			.catch(() => setUser([]));
	}, [userId, username]);

	return (
		<MaxWidthWrapper>
			<MobileOneLinkNavbar />

			<div className="">
				<OnelinkPitch user={user} />

				<div className="documentation shadow-sm border">
					<h1 className="px-md-5">Documentation</h1>
					<div className="docscontainer col-12 col-xl-10 justify-content-around mx-auto">
						{/* <Card
              text={"Financials"}
              onClicked={() =>
                navigate(`/onelink/${username}/${userId}/documentation/financials`)
              }
            /> */}
						{/* <Card
              text={"Pitch Deck"}
              onClicked={() =>
                navigate(
                  `/onelink/${username}/${userId}/documentation/pitchdeck`
                )
              }
              image={Pitch}
            />
            <Card
              text={"Legal and Compliance"}
              onClicked={() =>
                navigate(`/onelink/${username}/${userId}/documentation/legal`)
              }
              image={Legal}
            /> */}
						{/* <Card
              text={"Update"}
              onClicked={() =>
                navigate(`/onelink/${username}/${userId}/documentation/update`)
              }
            /> */}
						{/* <Card
              text={"KYC Details"}
              onClicked={() =>
                navigate(
                  `/onelink/${username}/${userId}/documentation/kycdetails`
                )
              }
              image={KYC}
            />
            <Card
              text={"Business"}
              onClicked={() =>
                navigate(
                  `/onelink/${username}/${userId}/documentation/business`
                )
              }
              image={Business}
            /> */}

						{loading && (
							<SpinnerBS
								className={
									"d-flex py-5 justify-content-center align-items-center w-100 vh-100"
								}
							/>
						)}
						{!loading &&
							folderName.map((folder, index) => {
								let imageToShow;

                switch (folder) {
                  case "pitchdeck":
                    imageToShow = Pitch;
                    break;
                  case "business":
                    imageToShow = Business;
                    break;
                  case "kycdetails":
                    imageToShow = KYC;
                    break;
                  case "legal and compliance":
                    imageToShow = Legal;
                    break;
                    case "onelinkpitch":
                      imageToShow = GreenPitch;
                      break;
                  default:
                    imageToShow = Pitch;
                }
                return (
                  <Card
                    key={index}
                    onClicked={() =>
                      navigate(
                        `/onelink/${username}/${userId}/documentation/${folder}`
                      )
                    }
                    text={folder}
                    image={imageToShow}
                    count={folderCounts[folder] || 0}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Documentation;
