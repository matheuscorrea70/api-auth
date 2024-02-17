import jwt from "jsonwebtoken";
import { TUser } from "src/types/user.type";

export const generateAccessToken = (user: TUser) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "10m",
  });
};
