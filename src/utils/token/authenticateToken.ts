import jwt from "jsonwebtoken";
import { MiddlewareFunc } from "src/types/request.type";
import { TUser } from "src/types/user.type";

export const authenticateToken: MiddlewareFunc = (request, response, next) => {
  const authHeader = request.headers?.authorization;
  const token = authHeader?.split(" ")?.[1];

  if (!token) {
    response.status(401).send({
      message: "An access token is required to request this resource.",
    });
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (error, user) => {
      if (error) {
        response
          .status(403)
          .send({ message: "Authentication failed: Token is not valid." });

        return;
      }

      request.user = user as TUser;

      next();
    }
  );
};
