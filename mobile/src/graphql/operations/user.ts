import { gql } from "@apollo/client";

const UserOperations = {
  Queries: {
    me: gql`
      query Me {
        me {
          id
          firstName
          lastName
          email
        }
      }
    `,
  },
  Mutations: {
    signIn: gql`
      mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          token
        }
      }
    `,
    signUp: gql`
      mutation SignUp(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
      ) {
        signUp(
          firstName: $firstName
          lastName: $lastName
          email: $email
          password: $password
        ) {
          token
        }
      }
    `,
  },
};

export default UserOperations;
