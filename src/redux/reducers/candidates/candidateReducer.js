import { candidateConstants } from "../../store/constants";

const initState = {
    message: '',
    loading: false,
    messageType:'',
    candidates: null
}

export default (state = initState, action) => {
    switch(action.type){
        // For Registration
        case candidateConstants.GET_CANDIDATE_REQUEST:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
            break;
        
        case candidateConstants.GET_CANDIDATE_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType,
                candidates: action.candidates
            }
            break;

        case candidateConstants.GET_CANDIDATE_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType
            }
            break;
    }

    return state;
}