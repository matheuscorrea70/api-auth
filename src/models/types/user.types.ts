export type TInsertUserPayload = {
  name: string;
  email: string;
  password: string;
}

export type TUpdateUserPayload = Partial<TInsertUserPayload> & {
  newPassword?: string;
};

export type TLoginResponse = { 
  accessToken: string; 
  refreshToken: string
};
