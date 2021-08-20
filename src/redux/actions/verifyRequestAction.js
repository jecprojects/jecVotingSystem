import { minerConstants } from '../store/constants';
import { firebaseApp } from '../../fbConfig';

const proceedFunction = (data, hash) => {

    const db = firebaseApp.firestore();

    const lengthOfChain = data.length;
    const lastblockNumber = lengthOfChain - 1;
    const blockNumber = lastblockNumber + 1;
    
    const previousHash = data.map(dt => {
        if(dt.blockNumber === lastblockNumber){
            return dt.hash;
        }
    }) 
    
        db
        .collection('blockChain')
        .doc(blockNumber.toString())
        .set({
            blockNumber: blockNumber,
            hash: hash,
            previousHash: previousHash[0],
            timing: new Date().toUTCString()
        }).then(() => {
            console.log('Added to Block chain')
        }).catch(err => {
            console.log(err);
        })

}

const addToBlockChain = async (hash) => {
    const db = firebaseApp.firestore();

    const data = [];
    const blockref = db.collection('blockChain');
    const snapshot = await blockref.get();

    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }  
    
    snapshot.forEach(doc => {
        data.push(doc.data());
    });

    proceedFunction(data, hash)
}

const setCountFunc = async (doc, lobby, pos, hash) =>{
    const db = firebaseApp.firestore();
    const vote = doc[lobby].voteCount;
    console.log(vote);
    await db
    .collection('candidate')
    .doc(pos)
    .set({
        [lobby]:{
            voteCount: vote + 1
        }
    }, {merge: true})
    .then(res => {
        addToBlockChain(hash);
    })
    .catch(err => {
        console.log(err);
    })
}

const updateVoteCount = async (dataFromPendingReq, hash) => {
    const db = firebaseApp.firestore();
    
    const ref = db.collection('voters').doc(dataFromPendingReq.voter)
    const doc = await ref.get()
    if(!doc.exists){
        console.log('Document Does Not Exist');
    }
    // Here i get the list of Selected Candidate in a Array
    const data = doc.data().votedCandidates;

    data.map(dt => {
        const lobby = dt.slice(0, 2);
        const pos = dt.slice(2);

        db
        .collection('candidate')
        .doc(pos)
        .get()
        .then(doc => {
            setCountFunc(doc.data(), lobby, pos, hash)

        })

    })

}

export const VerifyDataRequest = (email) => {
    return async dispatch => {
        // dispatch({
        //     type: minerConstants.VERIFY_DATA_REQUEST,
        //     messageType: 'req',
        //     message: 'Verifying..'
        // })

        const db = firebaseApp.firestore();
        const dataRef = db.collection('voterVerficationDB').doc(email);
        const doc = await dataRef.get();
        if (!doc.exists) {

            const dataFromPendingReq = [];
            // saving data to cancelled request and remove from pending Request
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
                //include it in Cancelled Request
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
            // Verification
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
                const hash = dataFromPendingReq[0].hash;
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
                            .then(res => {
                                updateVoteCount(dataFromPendingReq[0], hash)
                            }).catch(err => {
                                console.log(err);
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
}