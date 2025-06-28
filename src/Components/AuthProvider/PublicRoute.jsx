import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "../Loading/Loading";
// import { AuthContext } from "./AuthProvider";

const PublicRoute = ({ children }) => {
  const { userDetails, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>
  }

  // If logged in, redirect to dashboard or homepage
  if (userDetails?.email) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
