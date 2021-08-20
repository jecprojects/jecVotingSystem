import { minerConstants } from "../store/constants"

const initState = {
    message: '',
    loading: false,
    messageType: '',
    cancelledRequest: null
}

export default (state = initState, action) => {
    switch(action.type){
        case minerConstants.GET_DATA_REQUEST_CANCELLED:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
        break;

        case minerConstants.GET_DATA_SUCCESS_CANCELLED:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType,
                cancelledRequest: action.data
            }
        break;

        case minerConstants.GET_DATA_FAILURE_CANCELLED:
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