import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { storage } from "../utils/functions";

export default function apolloClient() {
  const token = storage.getString("token");

  const link = createHttpLink({
    uri: "http://192.168.0.135:4000/graphql",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link,
    cache,
  });
}
