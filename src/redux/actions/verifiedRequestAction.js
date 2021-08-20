import { firebaseApp } from "../../fbConfig"
import { minerConstants } from "../store/constants"

export const GetVerifiedRequestAction = () => {
    return async dispatch => {
        dispatch({
            type: minerConstants.GET_DATA_REQUEST_VERIFIED,
            messageType: 'req',
            message: 'Fetching..'
        })

        const db = firebaseApp.firestore();
        const snapshot = await db.collection('verifiedRequest').get();

        if(snapshot){
            const data = [];

            snapshot.forEach((doc) => {
                data.push(doc.data());
            })

            dispatch({
                type: minerConstants.GET_DATA_SUCCESS_VERIFIED,
                messageType: "suc",
                message: "Success!",
                data,
            })
        }else{
            dispatch({
                type: minerConstants.GET_DATA_FAILURE_VERIFIED,
                messageType: "flr",
                message: "Couldn't Found!"
            })
        }
    }
}