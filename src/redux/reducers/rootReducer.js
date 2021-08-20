import { combineReducers } from "redux";
import authReducer from "./authReducer";
import candidateReducer from "./candidates/candidateReducer";
import pendingRequestReducer from "./pendingRequestReducer";
import storeSelectedDataReducer from "./storeSelectedDataReducer";
import verifiedRequestReducer from "./verifiedRequestReducer";
import cancelledRequestReducer from './cancelledRequestReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    candidates: candidateReducer,
    selectedCandidate: storeSelectedDataReducer,
    pendingRequest: pendingRequestReducer,
    verifiedRequest: verifiedRequestReducer,
    cancelledRequest: cancelledRequestReducer
});

export default rootReducer;
