import { candidateConstants } from "../store/constants";
import { firebaseApp } from "../../fbConfig";

// /////////////// Getting Candidates /////////////////

export const getCandidateAction = () => {
    return async dispatch => {
        dispatch({
            type: candidateConstants.GET_CANDIDATE_REQUEST,
            messageType: "req",
            message: "Fetching.."
        })
        const db = firebaseApp.firestore();
        const snapshot = await db.collection('candidate').get();

        if(snapshot){
            // Declaring a new array
            const candidates = [];
            snapshot.forEach(doc => {
                candidates.push(doc.data())
            })
            dispatch({
                type: candidateConstants.GET_CANDIDATE_SUCCESS,
                messageType: "suc",
                message: "Success!",
                candidates,
            })
        }else{
            dispatch({
                type: candidateConstants.GET_CANDIDATE_FAILURE,
                messageType: "flr",
                message: "Couldn't Found!"
            })
        }

    }
}