import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import { JwtPayload } from "../utils/types";

export const createToken = (id: string) => {
  const APP_SECRET = process.env.APP_SECRET;

  if (!APP_SECRET) {
    throw new GraphQLError(
      "Missing APP_SECRET environment variable in config file"
    );
  }

  return jwt.sign({ userId: id }, APP_SECRET);
};

function getTokenPayload(token: string) {
  const APP_SECRET = process.env.APP_SECRET;

  if (!APP_SECRET) {
    throw new GraphQLError(
      "Missing APP_SECRET environment variable in config file"
    );
  }

  return jwt.verify(token, APP_SECRET) as JwtPayload;
}

export function getUserId(authHeader: string): string | null {
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      throw new GraphQLError("No token found");
    }

    const { userId } = getTokenPayload(token);

    return userId;
  }

  return null;
}
