import { minerConstants } from "../store/constants"

const initState = {
    message: '',
    loading: false,
    messageType: '',
    verifiedRequest: null
}

export default (state = initState, action) => {
    switch(action.type){
        case minerConstants.GET_DATA_REQUEST_VERIFIED:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
        break;

        case minerConstants.GET_DATA_SUCCESS_VERIFIED:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType,
                verifiedRequest: action.data
            }
        break;

        case minerConstants.GET_DATA_FAILURE_VERIFIED:
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