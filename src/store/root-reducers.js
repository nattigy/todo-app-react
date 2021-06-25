import { combineReducers } from "redux";

import authReducers from "./auth/auth.reducers";

/*Combines all the reducers in the app to a single reducer
which is going to be sent to the redux store
for now there is only authentication reducer
 */
export default combineReducers({
    auth: authReducers,
});
