import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { setContext } from "apollo-link-context";

const uploadLink = createUploadLink({
  //http://localhost:5000/graphql
  //https://vanlangfeeds-server.herokuapp.com/graphql
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing, incoming, { readField, args }) {
            const { after } = args;
            if (after) {
              const existingEdges = existing.edges;
              const incomingEdges = incoming.edges;
              const mergedEdges = [...existingEdges, ...incomingEdges];
              return {
                ...incoming,
                edges: mergedEdges,
              };
            }
            return {
              ...incoming,
              edges: readField("edges", incoming),
              pageInfo: readField("pageInfo", incoming),
            };
          },
        },
      },
    },
    Post: {
      fields: {
        votes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        devotes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        comments: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        answers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        followers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: cache,
});

export default (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);
