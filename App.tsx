import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Routes } from "./src/routes";

const client = new ApolloClient({
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}
