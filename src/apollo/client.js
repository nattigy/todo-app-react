import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  // uri: "https://frozen-oasis-35227.herokuapp.com/",
  uri: "http://localhost:5000/",
  cache,
});
