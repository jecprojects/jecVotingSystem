import { combineReducers } from "redux";
import authReducer from "./authReducer";
import candidateReducer from "./candidates/candidateReducer";
import pendingRequestReducer from "./pendingRequestReducer";
import storeSelectedDataReducer from "./storeSelectedDataReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    candidates: candidateReducer,
    selectedCandidate: storeSelectedDataReducer,
    pendingRequest: pendingRequestReducer
});

export default rootReducer;
