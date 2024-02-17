import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";

export const verifyRefreshToken = (
  refreshToken: string,
  callback: VerifyCallback<JwtPayload | string>
) => {
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    callback
  );
};
