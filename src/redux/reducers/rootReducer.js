import { combineReducers } from "redux";
import authReducer from "./authReducer";
import candidateReducer from "./candidates/candidateReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    candidates: candidateReducer
});

export default rootReducer;
