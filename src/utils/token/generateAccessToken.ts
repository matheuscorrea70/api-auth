import jwt from "jsonwebtoken";
import { type TUser } from "src/types/user.type";

export const generateAccessToken = (user: TUser): string => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET ?? '', {
    expiresIn: "15m",
  });
};
