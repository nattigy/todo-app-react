import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import App from './App';

import configureStore from "./store/store";
import { client } from './apollo/client';

//import bootstrap and main css files
import "bootstrap/dist/css/bootstrap.min.css";
import "./assest/css/main.sass";

const store = configureStore();

/* Render the dom the App component in dom element 'root'
Apollo provider manages state and data which is fetch from backend graphql api
Redux Provider manged user data state, and authentication state from firebase and graphql api
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
