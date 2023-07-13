import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { storage } from "../utils/functions";

const httpLink = createHttpLink({
  uri: "http://192.168.0.135:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = storage.getString("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "NativeAuth",
  version: "1.0",
});

export default client;
