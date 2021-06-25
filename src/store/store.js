import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import rootReducer from "./root-reducers";

import { verifyAuth } from "./auth/auth.utils";

export default function configureStore() {
    //Configuring the redux store
    //The redux-thunk middleware, allows simple asynchronous use of dispatch.
    const initialState = {};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    //Calling the verifyAuth action on every page routing to identify the user
    store.dispatch(verifyAuth());
    return store;
}