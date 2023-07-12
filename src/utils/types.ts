import { Prisma, PrismaClient } from "@prisma/client";
import { tokenSelected, userSelected } from "../graphql/User/resolvers";

/**
 * Context
 */
export interface GraphQLContext {
  prisma: PrismaClient;
  userId: string | null;
}

/**
 * Authentication
 */
export interface JwtPayload {
  userId: string;
}

/**
 * User
 */
export interface SignUpArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInArgs {
  email: string;
  password: string;
}

export type TokenSelectedPayload = Prisma.TokenGetPayload<{
  select: typeof tokenSelected;
}>;

export type UserSelectedPayload = Prisma.UserGetPayload<{
  select: typeof userSelected;
}>;
