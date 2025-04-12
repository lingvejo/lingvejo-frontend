import { ApolloClient, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Adjust the URL as per your backend
  cache: new InMemoryCache(),
});

export default client;
