import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // Use the environment variable here
  cache: new InMemoryCache(),
});

export default client;
