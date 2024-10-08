import { useOutletContext } from "react-router";
import InvestedStartUpCard from "./InvestedStartUpCard/InvestedStartUpCard";
import "./InvestorOneLinkStartups.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "../../../Store/features/design/designSlice";

export default function InvestorOneLinkStartups() {
  const { company } = useOutletContext();

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Startups Invested | The Capital Hub";
    dispatch(setPageTitle("Startups Invested"));
  }, [dispatch]);

  return (
    <div className="investor-onelink-startups-invested">
      <h3 className="px-3 px-xxl-0 fw-bold page_heading">Startups Invested</h3>
      <div className="startups-list">
        {company?.startupsInvested?.map((startUp) => (
          <InvestedStartUpCard startUp={startUp} />
        ))}
      </div>
    </div>
  );
}
