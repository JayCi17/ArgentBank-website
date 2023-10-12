import { combineReducers } from "redux";
import authReducer from "./authreducer";
import nameReducer from "./namereducer";

const rootReducer = combineReducers({
    auth : authReducer,
    name : nameReducer,
});

export default rootReducer;
