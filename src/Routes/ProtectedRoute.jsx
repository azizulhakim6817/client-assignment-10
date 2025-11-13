import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/register" state={{ from: location }} replace />;
};

export default ProtectedRoute;
