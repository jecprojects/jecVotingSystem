import { minerConstants } from "../store/constants"

const initState = {
    message: '',
    loading: false,
    messageType: '',
    pendingRequest: null
}

export default (state = initState, action) => {
    switch(action.type){
        case minerConstants.GET_DATA_REQUEST_PENDING:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
        break;

        case minerConstants.GET_DATA_SUCCESS_PENDING:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType,
                pendingRequest: action.data
            }
        break;

        case minerConstants.GET_DATA_FAILURE_PENDING:
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