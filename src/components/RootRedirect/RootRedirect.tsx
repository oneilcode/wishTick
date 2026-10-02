import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { Loader } from "@/components/Loader";

export const RootRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return <Navigate to={user ? "/mywishes" : "/about"} replace />;
};
