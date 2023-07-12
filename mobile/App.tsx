import { ApolloProvider } from "@apollo/client";

import apolloClient from "./src/graphql/apollo-client";
import { Routes } from "./src/routes";

export default function App() {
  const client = apolloClient();

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}
