import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

export const ProtectedRoutes = ({ element }: { element: React.ReactNode }) => {
  const { user } = useAuth();

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};
