import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../components/Admin/Layouts/ProtectedLayout/ProtectedLayout";
import Login from "../pages/Admin/Login/Login";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Settings from "../pages/Admin/Settings/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} exact />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
