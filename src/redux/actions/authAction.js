import { authConstants } from '../store/constants';
import { firebaseApp } from '../../fbConfig';

////// Is user Loggedd IN////////////////////////
export const getUserData = () => {
    return async dispatch => {
        const email = localStorage.getItem('email');
        if(email) {
            const userRef = firebaseApp.firestore()
                    .collection('voters')
                    .doc(email)

            const doc = await userRef.get();

            if(!doc.exists){
                console.log('Document Not Found!')
            }else{
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    messageType: "suc",
                    message: "Login Success!",
                    user: doc.data()
                })
            }


        }
    }
}

////// Is user Loggedd IN////////////////////////
export const IsUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token) {
            await firebaseApp.auth()
                .onAuthStateChanged((user) => {
                    const email = user.email;

                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        messageType: "suc",
                        message: "Login Success!",
                        token: token,
                        email: email
                    })
                })
        }
    }
}
// This Is Register Action/////////////////////////////////////

export const RegisterAction = (userObj) => {
    return async dispatch => {
        
        // Dispatching the request
        dispatch({
            type: authConstants.REGISTER_REQUEST,
            messageType: "req",
            message: "Fetching.."
        })
        
        const db = firebaseApp.firestore();
        await db.collection('voterVerficationDB').doc(userObj.userEmail)
            .get()
            .then((doc) => {
                // If Document Exists..
                if(doc.exists){
                    dispatch({
                        type: authConstants.REGISTER_REQUEST,
                        messageType: "req",
                        message: "Verifying.."
                    })
                    // Comparing user Roll Number with The Database Roll Number
                    if(doc.data().rollNumber === userObj.userRollNumber){
                        // Cross Verification Done here. 
                        // Now We Can Proceed to Authentication
                        dispatch({
                            type: authConstants.REGISTER_SUCCESS,
                            messageType: "suc",
                            message: "Verification Done!"
                        })
                        firebaseApp.auth()
                            .createUserWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
                            .then(userCredential => {
                                dispatch({
                                    type: authConstants.REGISTER_SUCCESS,
                                    messageType: "suc",
                                    message: "Creating Database.."
                                })
                                const user = userCredential.user;
                                if(user){
                                    // Saving Details to database in user collection.
                                    const email = userObj.userEmail;
                                    firebaseApp.firestore().collection('voters')
                                        .doc(email)
                                        .set({
                                            email: userObj.userEmail,
                                            rollNumber: userObj.userRollNumber,
                                            voted: false
                                        }, {merge: true})
                                        .then(() => {
                                            // Sending User a Verification Link
                                            firebaseApp.auth().currentUser
                                            .sendEmailVerification()
                                            .then(() => {
                                                // Dispatch Success Action
                                                dispatch({
                                                    type: authConstants.REGISTER_SUCCESS,
                                                    messageType: "suc",
                                                    message: "Email Verification Link Sent! Verify Email and Login."
                                                })
                                            }).catch(err => {
                                                console.log(err);
                                                dispatch({
                                                    type: authConstants.REGISTER_FAILURE,
                                                    messageType: "flr",
                                                    message: "Couldn't Sent Link! Server Error!"
                                                })
    
                                            })
                                        }).catch(() => {
                                            dispatch({
                                                type: authConstants.REGISTER_FAILURE,
                                                messageType: "flr",
                                                message: "Couldn't create Database!"
                                            })
                                        })
                                }
                            }).catch(() => {
                                dispatch({
                                    type: authConstants.REGISTER_FAILURE,
                                    messageType: "flr",
                                    message: "Email Already Registered! Try Login."
                                })
                            })
                    }else{
                        // If User rollNumber DoesNot Match
                        dispatch({
                            type: authConstants.REGISTER_FAILURE,
                            messageType: "flr",
                            message: "Enter correct rollNumber!"
                        })
                    }
                }else{
                    // If Document Not exist.
                    console.log("Entered Email is Not found in our student Database!");
                    dispatch({
                        type: authConstants.REGISTER_FAILURE,
                        messageType: "flr",
                        message: "Entered Email is Not found in our student Database!"
                    })
                }
            }).catch(err => {
                // Error Occured while Getting the Document
                dispatch({
                    type: authConstants.REGISTER_FAILURE,
                    messageType: "flr",
                    message: "Server Connection Error!"
                })
            })
    }
}

// This Is Login Action////////////////////////////////////////
export const LoginAction = (userObj) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            messageType: "req",
            message: "Analysing.."
        })

        await firebaseApp.auth()
            .signInWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user){
                    // Verifying that the Email is Verified or Not
                    if(user.emailVerified === true){
                        user.getIdToken()
                            .then((token) => {
                                localStorage.setItem('token', token);
                                localStorage.setItem('email', user.email);

                                dispatch({
                                    type: authConstants.LOGIN_SUCCESS,
                                    messageType: "suc",
                                    message: "Login Success!",
                                    token: token,
                                    email: user.email
                                })
                            })
                        // Email is Verified 
                    }else{
                        // Email is Not Verified
                        dispatch({
                            type: authConstants.LOGIN_FAILURE,
                            messageType: "flr",
                            message: "Verify Your Email First!"
                        })
                    }
                }
            }).catch(err => {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    messageType: "flr",
                    message: err.message
                })
            })
    }
}



//////////// Logout Action /////////////

export const LogoutAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })

        await firebaseApp.auth().signOut()
            .then(() => {
                // Clearing Local Storge
                localStorage.clear();

                dispatch({
                    type: authConstants.LOGOUT_SUCCESS
                })
            }).catch((err) => {
                dispatch({
                    type: authConstants.LOGOUT_FAILURE
                })
            })
    }
}