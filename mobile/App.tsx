import { ApolloProvider } from "@apollo/client";

import { useBiometricExists } from "./src/hooks/useBiometricAvalaible";
import client from "./src/graphql/apollo-client";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}
