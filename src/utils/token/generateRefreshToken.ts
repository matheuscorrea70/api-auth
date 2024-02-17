import jwt from "jsonwebtoken";
import { TUser } from "src/types/user.type";

export const generateRefreshToken = (user: TUser) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
};
