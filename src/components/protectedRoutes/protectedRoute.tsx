import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, accessToken } = useSelector((state: any) => state.user);

  if (!accessToken || !user) {
    // Redirect to login page, saving current location
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
