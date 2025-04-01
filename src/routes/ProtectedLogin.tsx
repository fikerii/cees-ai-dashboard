import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

export const ProtectedLogin = () => {
  const { user } = useAuth();

  return user ? (
    <Navigate
      to="/dashboard"
      replace
    />
  ) : (
    <Outlet />
  );
};
