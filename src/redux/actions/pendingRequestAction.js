import { firebaseApp } from "../../fbConfig"
import { minerConstants } from "../store/constants"

export const GetPendingRequestAction = () => {
    return async dispatch => {
        dispatch({
            type: minerConstants.GET_DATA_REQUEST_PENDING,
            messageType: 'req',
            message: 'Fetching..'
        })

        const db = firebaseApp.firestore();
        const snapshot = await db.collection('pendingRequests').get();
        
        if(snapshot){
            const data = [];

            snapshot.forEach((doc) => {
                data.push(doc.data());
            })
            dispatch({
                type: minerConstants.GET_DATA_SUCCESS_PENDING,
                messageType: "suc",
                message: "Success!",
                data,
            })
        }else{
            dispatch({
                type: minerConstants.GET_DATA_FAILURE_PENDING,
                messageType: "flr",
                message: "Couldn't Found!"
            })
        }
    }
}