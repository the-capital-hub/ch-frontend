import { Link } from "react-router-dom";
import "./Settings.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../Store/features/design/designSlice";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Settings"));
  }, []);
  
  return (
    <div className="admin-settings-page">
      <h1>Settings</h1>
      <Link to={"/admin/dashboard"} className="d-block my-3">
        Dashboard
      </Link>
    </div>
  );
};

export default Settings;
