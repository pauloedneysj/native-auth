import { GraphQLError } from "graphql";
import { SignUpArgs } from "./types";

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

interface ValidateSignUp {
  isValid: boolean;
  errorMessage?: string;
}

export function validateSignUp(args: SignUpArgs): ValidateSignUp {
  const { firstName, lastName, email, password } = args;

  if (firstName.length === 0) {
    return { isValid: false, errorMessage: "Invalid first name provided" };
  }

  if (lastName.length === 0) {
    return { isValid: false, errorMessage: "Invalid last name provided" };
  }

  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return { isValid: false, errorMessage: "Invalid email provided" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      errorMessage: "Invalid password must be at least 8 characters",
    };
  }

  return { isValid: true };
}
