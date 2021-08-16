import { minerConstants } from '../store/constants';
import { firebaseApp } from '../../fbConfig';

export const CancelDataRequest = (email) => {
    return async dispatch => {
        dispatch({
            type: minerConstants.CANCELLED_DATA_REQUEST,
            messageType: 'req',
            message: 'Verifying..'
        })

        const db = firebaseApp.firestore();

        const dataFromPendingReq = [];

        const snapshot = await db
            .collection('pendingRequests')
            .where('voter', '==', email)
            .get()

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  
        
        snapshot.forEach(doc => {
            dataFromPendingReq.push(doc.data());
        });

        if(dataFromPendingReq){
            //include it in Verified Request
            await db    
                .collection('cancelledRequest')
                .doc(dataFromPendingReq[0].hash)
                .set({
                    ...dataFromPendingReq[0]
                }).then(res => {
                    // Then We will Delete it here 
                    db
                    .collection('pendingRequests')
                    .doc(dataFromPendingReq[0].hash)
                    .delete()
                    .then(res => {
                        db
                        .collection('voters')
                        .doc(dataFromPendingReq[0].voter)
                        .set({
                            voted: 'no'
                        }, {merge: true})
                        .then(res => {
                            dispatch({
                                type: minerConstants.CANCELLED_DATA_SUCCESS,
                                messageType: "suc",
                                message: "Verified.",
                            })
                        }).catch(err => {
                            dispatch({
                                type: minerConstants.CANCELLED_DATA_FAILURE,
                                messageType: "flr",
                                message: "Failed!"
                            })
                        })
                    }).catch(err => {
                        console.log(err);
                    })

                }).catch(err => {
                    console.log(err);
                })
        }
    }
}