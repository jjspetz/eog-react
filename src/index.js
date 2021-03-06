import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
});
console.log("client")
console.log(client)
client
  .query({
    query: gql`
      {
        getMetrics
      }
    `
  })
  .then(result => {
    ReactDOM.render(<App client={client} metric={result}/>, document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
