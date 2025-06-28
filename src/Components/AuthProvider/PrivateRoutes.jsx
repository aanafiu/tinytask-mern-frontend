import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {
  const { userDetails } = useContext(AuthContext);
  const location = useLocation();

  if (!userDetails) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, allow access
  return children;
};

export default PrivateRoute;
