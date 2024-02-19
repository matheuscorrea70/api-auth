import jwt from "jsonwebtoken";
import { type TUser } from "src/types/user.type";

export const generateRefreshToken = (user: TUser): string => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET ?? '');
};
