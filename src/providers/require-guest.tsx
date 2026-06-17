import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/context/auth-context";
import { getAuthToken } from "@/lib/models";

const RequireGuest = () => {
  const { auth } = useAuth();

  if (getAuthToken(auth)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default RequireGuest;
