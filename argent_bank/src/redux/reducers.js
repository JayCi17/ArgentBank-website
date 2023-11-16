// on combine les reducers pour faciliter la maintenance et la gestion du state de l'application 
import { combineReducers } from "redux";
import authReducer from "./authreducer";
import nameReducer from "./namereducer";

const rootReducer = combineReducers({
    auth : authReducer,
    name : nameReducer,
});

export default rootReducer;
