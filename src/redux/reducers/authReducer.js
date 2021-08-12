import { authConstants } from "../store/constants"

const initState = {
    token: null,
    email: null,
    authenticate: false,
    authenticating: false,
    message: '',
    loading: false,
    messageType: '',
    voted: false,
    toLoginPage: false,
    user: null
}

export default (state = initState, action) => {
    switch(action.type){
        // For Registration
        case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
            break;
        
        case authConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType
            }
            break;

        case authConstants.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.message,
                messageType: action.messageType
            }
            break;

        // For Login
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true,
                message: action.message,
                messageType: action.messageType
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                authenticating: false,
                authenticate: true,
                message: action.message,
                messageType: action.messageType,
                token: action.token,
                email: action.email,
                loading: false,
                user: action.user
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                authenticate: false,
                message: action.message,
                messageType: action.messageType,
                loading: false
            }
            break;

        // For Logout Function
                // For Logout Action
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...initState,
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...initState,
            }
            break;
    }
    return state;
}