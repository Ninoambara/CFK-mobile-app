import AppNavigation from "./src/navigation/AppNavigation";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cfk.ninoambara.tech/",
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}
