import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import bcryptjs from "bcryptjs";

import {
  GraphQLContext,
  SignInArgs,
  SignUpArgs,
  TokenSelectedPayload,
  UserSelectedPayload,
} from "../../utils/types";
import { createToken } from "../../middleware/auth";
import { validateSignUp } from "../../utils/functions";

export default {
  Query: {
    me: async function (
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<UserSelectedPayload> {
      const { prisma, userId } = context;

      if (!userId) {
        throw new GraphQLError("Not authenticated");
      }

      const me = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: userSelected,
      });

      if (!me) {
        throw new GraphQLError("User not found");
      }

      return me;
    },
  },
  Mutation: {
    signUp: async function (
      _: any,
      args: SignUpArgs,
      context: GraphQLContext
    ): Promise<TokenSelectedPayload> {
      const { prisma } = context;
      const { email, firstName, lastName, password } = args;

      const { isValid, errorMessage } = validateSignUp(args);

      if (!isValid && errorMessage) {
        throw new GraphQLError(errorMessage);
      }

      const emailAlreadyInUse = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!!emailAlreadyInUse) {
        throw new GraphQLError("Email already in use");
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
      });

      if (!newUser) {
        throw new GraphQLError("Error on creating user");
      }

      const newToken = createToken(newUser.id);

      const token = await prisma.token.create({
        data: {
          token: newToken,
          userId: newUser.id,
        },
        select: tokenSelected,
      });

      if (!token) {
        throw new GraphQLError("Error on creating token");
      }

      return token;
    },
    signIn: async function (
      _: any,
      args: SignInArgs,
      context: GraphQLContext
    ): Promise<TokenSelectedPayload> {
      const { prisma } = context;
      const { email, password } = args;

      if (!email || !password) {
        throw new GraphQLError("Invalid email or password");
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new GraphQLError("Invalid email or password");
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);

      if (!isValidPassword) {
        throw new GraphQLError("Invalid email or password");
      }

      await prisma.token.deleteMany({
        where: {
          userId: user.id,
        },
      });

      const newToken = createToken(user.id);

      const token = await prisma.token.create({
        data: {
          token: newToken,
          userId: user.id,
        },
        select: tokenSelected,
      });

      return token;
    },
  },
};

export const userSelected = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
});

export const tokenSelected = Prisma.validator<Prisma.TokenSelect>()({
  token: true,
});
