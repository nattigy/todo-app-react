import { ApolloClient, InMemoryCache } from "@apollo/client";

//Apollo Client stores cache in memory
const cache = new InMemoryCache();

//Connect to the backend graphql api
export const client = new ApolloClient({
  uri: "https://frozen-oasis-35227.herokuapp.com/",
  cache,
});
