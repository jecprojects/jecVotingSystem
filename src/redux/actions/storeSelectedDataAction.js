import { storeSelectedDataConstants } from "../store/constants"


export const StoreSelectedDataAction = (userData, selectedCandidate) => {
    return async (dispatch) => {

        dispatch({
            type: storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_REQUEST,
            messageType: "req",
            message: "adding.."
        })

        // Checking whether Data Is Present In the Array or Not.
        if(selectedCandidate.includes(userData)){

            dispatch({
                type: storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_SUCCESS,
                messageType: "res",
                message: "added!",
                selectedCandidate: selectedCandidate
            })

            console.log(selectedCandidate);

        }else{
            // If Not In The Array Then Push It.
            let ind = -1;
            // Checking for alternate Candidate like if L1BCR exist then next when user input is L2BCR.
            // It will Remove L1BCR first.
            selectedCandidate.map((cand, index) => {
                if(cand.slice(2) === userData.slice(2)){
                    ind = index;
                }
            })

            // If Data is to Replace.
            if(ind >= 0){
                selectedCandidate.splice(ind, 1, userData);
                dispatch({
                    type: storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_SUCCESS,
                    messageType: "res",
                    message: "added!",
                    selectedCandidate: selectedCandidate
                })
            }else{
                selectedCandidate.push(userData);
                dispatch({
                    type: storeSelectedDataConstants.STORE_SELECTED_CANDIDATE_DATA_SUCCESS,
                    messageType: "res",
                    message: "added!",
                    selectedCandidate: selectedCandidate
                })
            }
        }
    }
}