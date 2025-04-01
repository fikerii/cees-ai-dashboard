export interface UserInterface {
  user_id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  display_picture: string;
  //   notification_count: number;
}

export interface LoginResponse {
  access_token: string;
  user: UserInterface;
}

export type LoginProps = {
  email: string;
  password: string;
};
