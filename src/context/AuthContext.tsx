import { createContext } from "react";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginProps, LoginResponse, UserInterface } from "../api/auth/type";
import { getUser, loginFunction, logoutFunction } from "../api/auth";
import Loading from "../pages/Loading";

type AuthContextType = {
  user: UserInterface | null;
  login: UseMutationResult<LoginResponse, Error, LoginProps, unknown>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const user = await getUser();
      // const newRole = generateNewRole(user);
      // const updatedUser = { ...user, role: newRole };
      const updatedUser = { ...user };
      return updatedUser;
    }

    return null;
  };

  const { data: User, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUserData,
  });

  const loginMutation = useMutation({
    mutationFn: loginFunction,
    onSuccess: ({ access_token, user }) => {
      localStorage.setItem("token", access_token);
      // const newRole = generateNewRole(user);
      // const updatedUser = { ...user, role: newRole };
      const updatedUser = { ...user };
      queryClient.setQueryData(["authUser"], updatedUser);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutFunction,
    onSuccess: () => {
      localStorage.clear();
      queryClient.clear();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const value: AuthContextType = {
    user: User || null,
    login: loginMutation,
    logout: logoutMutation.mutateAsync,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
