import { combineReducers } from "redux";

import authReducers from "./auth/auth.reducers";

export default combineReducers({
    auth: authReducers,
});
