import { minerConstants } from '../store/constants';
import { firebaseApp } from '../../fbConfig';

export const VerifyDataRequest = (email) => {
    return async dispatch => {
        dispatch({
            type: minerConstants.VERIFY_DATA_REQUEST,
            messageType: 'req',
            message: 'Verifying..'
        })

        const db = firebaseApp.firestore();
        const dataRef = db.collection('voterVerficationDB').doc(email);
        const doc = await dataRef.get();
        if (!doc.exists) {
            // If Document Doesnot Exist
            
            // db.collection('voters').doc(email).set({
            //     voted: 'no'
            // },{merge: true})
            // .then((res) => {
            //     dispatch({
            //         type: minerConstants.GET_DATA_FAILURE,
            //         messageType: "flr",
            //         message: "Not Verified!"
            //     })
            // }).catch((err) => {
            //     console.log(err);
            // })

            const dataFromPendingReq = [];
            // saving data to verified request and remove from pending Request
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
            //   console.log(dataFromPendingReq)

            

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
                        }).catch(err => {
                            console.log(err);
                        })

                    }).catch(err => {
                        console.log(err);
                    })
            }
        } else {

            dispatch({
                type: minerConstants.GET_DATA_SUCCESS,
                messageType: "suc",
                message: "Verified.",
            })

            const dataFromPendingReq = [];
            // saving data to verified request and remove from pending Request
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
            //   console.log(dataFromPendingReq)

            if(dataFromPendingReq){
                //include it in Verified Request
                await db    
                    .collection('verifiedRequest')
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
                                voted: 'yes'
                            }, {merge: true})
                        }).catch(err => {
                            console.log(err);
                        })

                    }).catch(err => {
                        console.log(err);
                    })
            }
        }
    }
}