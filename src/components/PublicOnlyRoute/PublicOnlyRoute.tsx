import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Loader } from "@/components/Loader";

export const PublicOnlyRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (user) return <Navigate to="/mywishes" replace />;

  return <Outlet />;
};
