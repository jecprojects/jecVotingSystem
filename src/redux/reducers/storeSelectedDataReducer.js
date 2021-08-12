import { storeSelectedDataConstants } from "../store/constants";

const initState = {
    selectedCandidate: [],
    message: '',
    loading: false,
    messageType: ''
}

export default (state = initState, action) => {
    switch(action.type){
        case storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_REQUEST:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
            break;
        
        case storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType,
                selectedCandidate: action.selectedCandidate
            }
            break;

        case storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_FAILURE:
            state ={
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType
            }
            break;
    }

    return state;
}