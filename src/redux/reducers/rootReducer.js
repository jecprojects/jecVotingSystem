import { combineReducers } from "redux";
import authReducer from "./authReducer";
import candidateReducer from "./candidates/candidateReducer";
import storeSelectedDataReducer from "./storeSelectedDataReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    candidates: candidateReducer,
    selectedCandidate: storeSelectedDataReducer
});

export default rootReducer;
