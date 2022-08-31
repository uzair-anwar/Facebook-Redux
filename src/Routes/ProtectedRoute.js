import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
