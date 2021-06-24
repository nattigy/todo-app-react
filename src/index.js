import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import App from './App';

import configureStore from "./store/store";
import { client } from './apollo/client';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assest/css/main.sass";

const store = configureStore();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
