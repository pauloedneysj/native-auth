import gql from "graphql-tag";

export default gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
  }

  type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): SignUpResponse
  }

  type SignUpResponse {
    token: String
  }

  type Mutation {
    signIn(email: String!, password: String!): SignInResponse
  }

  type SignInResponse {
    token: String
  }

  type Query {
    me: User
  }
`;
