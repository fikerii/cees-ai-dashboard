import api from "../config/axios";
import { APIParams } from "../type";

export type UserProps = {
  user_id?: number;
  username: string;
  password: string;
  role: string;
  email: string;
  phone: string;
  address: string;
};

export const getDatatableUser = async ({ row_per_page, search, current_page }: APIParams) => {
  const response = await api.get("/api/user/datatable", {
    params: {
      row_per_page,
      search,
      current_page,
    },
  });
  return response.data.data;
};
export const getUser = async () => {
  const response = await api.get("/api/user");
  return response.data;
};

export const createUser = async (data: UserProps) => {
  const response = await api.post("/api/user", data);
  return response.data;
};

export const getUserById = async (user_id: number) => {
  const response = await api.get("/api/user/getById", {
    params: {
      user_id,
    },
  });
  return response.data.data;
};

export const updateUser = async (data: UserProps) => {
  const response = await api.put("/api/user", data);
  return response.data;
};

export const deleteUser = async (user_id: number) => {
  const response = await api.delete("/api/user", {
    params: {
      user_id,
    },
  });
  return response.data;
};
