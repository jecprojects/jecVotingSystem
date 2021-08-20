import { firebaseApp } from "../../fbConfig"
import { minerConstants } from "../store/constants"

export const GetCancelledRequestAction = () => {
    return async dispatch => {
        dispatch({
            type: minerConstants.GET_DATA_REQUEST_CANCELLED,
            messageType: 'req',
            message: 'Fetching..'
        })

        const db = firebaseApp.firestore();
        const snapshot = await db.collection('cancelledRequest').get();

        if(snapshot){
            const data = [];

            snapshot.forEach((doc) => {
                data.push(doc.data());
            })

            dispatch({
                type: minerConstants.GET_DATA_SUCCESS_CANCELLED,
                messageType: "suc",
                message: "Success!",
                data,
            })
        }else{
            dispatch({
                type: minerConstants.GET_DATA_FAILURE_CANCELLED,
                messageType: "flr",
                message: "Couldn't Found!"
            })
        }
    }
}