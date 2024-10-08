import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import { selectAuthAdmin } from "../../../Store/features/admin/selectors";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { loginSuccess } from "../../../Store/features/admin/slice";

const Login = () => {
  // States
  const authAdmin = useSelector(selectAuthAdmin);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth check
  if (authAdmin) {
    return <Navigate to={"/admin/dashboard"} replace />;
  }

  // Handlers
  const handleLogin = async () => {
    dispatch(
      loginSuccess({
        name: "Test admin",
      })
    );
    return navigate("/admin/dashboard");
  };

  // JSX
  return (
    <div className="admin-login-page">
      <h1>Admin Login Page</h1>
      <Button variant="dark" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
