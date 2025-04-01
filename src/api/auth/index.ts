import api from "../config/axios";
import { LoginProps, LoginResponse, UserInterface } from "./type";

export const loginFunction = async ({ email, password }: LoginProps): Promise<LoginResponse> => {
  const response = await api.post("/api/auth/login", JSON.stringify({ email, password }), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
};

export const logoutFunction = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getUser = async (): Promise<UserInterface> => {
  const response = await api.get("/api/auth/userProfile");
  return response.data.data;
};

export const refreshToken = async () => {
  const response = await api.post("/api/auth/refresh");
  return response.data.data;
};
