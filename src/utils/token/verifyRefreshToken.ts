import jwt, { type JwtPayload, type VerifyCallback } from "jsonwebtoken";

export const verifyRefreshToken = (
  refreshToken: string,
  callback: VerifyCallback<JwtPayload | string>
): void => {
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET ?? '',
    callback
  );
};
