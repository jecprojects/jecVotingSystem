import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, LogoutAction } from '../../redux/actions/authAction';

import { NavLink, Redirect } from 'react-router-dom';

import {HiMenuAlt3} from 'react-icons/hi';
import {FiX, FiLogOut} from 'react-icons/fi';
import {GoHome} from 'react-icons/go';
import VoteDiv from '../../component/votdiv';
import { getCandidateAction } from '../../redux/actions/candidateAction';

import './style.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Button } from '@material-ui/core';
import { firebaseApp } from '../../fbConfig';
import sha256 from 'sha256';
/**
* @author
* @function UserPage
**/

const UserPage = (props) => {
  const dispatch = useDispatch();


  const auth = useSelector(state => state.auth);
  const selectedCandidate = useSelector(state => state.selectedCandidate);
  const candidates = useSelector(state => state.candidates);

  const onSubmit = async () => {
    if(auth.user.voted == "yes"){
      // Already Voted
    }
    if(auth.user.voted == "no"){
      if(selectedCandidate.selectedCandidate.length === 12){

        const hash = sha256(`${selectedCandidate.selectedCandidate}${auth.email}`)
        console.log(hash)

        const votedCandidates = selectedCandidate.selectedCandidate;
        // Here the block is Created And Send To Verification
        const verificationRef = firebaseApp.firestore().collection('pendingRequests').doc(hash);
        await verificationRef.set({
          hash: hash,
          voter: auth.email,
          votedOn: new Date().toUTCString()
        }, { merge: true }).then(res => {
          console.log('Updated!');
          // Turn Voted Field to Pending..

          const userRef = firebaseApp.firestore().collection('voters').doc(auth.email);
          userRef.set({
            voted: 'pending',
            votedCandidates,
          },{merge: true})
          .then(res => {
            console.log('Set to Pending..')
            dispatch(getUserData());
          }).catch(err => {
            console.error(err);
          })
        });
      }else{
        alert('You Should Select all 12 Candidates');
      }
    }
  }


  const logoutFunction = (e) => {
    dispatch(LogoutAction())
  }

  const redirectToHome = () => {
    <Redirect to="/" />
  }

  useEffect(() => {
    dispatch(getCandidateAction());
  },[])

  useEffect(() => {
    const interval = setInterval(() => {

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filterDiv = () => {
    if(auth && auth.user){
      switch(auth.user.voted){
        case 'yes': 
          return(
            <div className="main-body-div">

              <h1>You have Done Voting!</h1>
            </div>
          );
        break;


// If no
        case 'no': 
          return(
            <div className="main-body-div">

              <h1>Cast Your Vote</h1>
      
              <div className="votecast-main-div">
                {
                  candidates.candidates ? candidates.candidates.map(candidate => {
                    return <VoteDiv key={candidate.L1.id} candidate={candidate}/>
                  })
                  :
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                }
              </div>
      
              <div style={{marginTop:50}}>
                <Button onClick={onSubmit} variant="contained" color="primary">
                  Submit
                </Button> 
              </div>
            </div>
          );
        break;

        // If no
        case 'pending': 
          return(
            <div className="main-body-div">

              <h1>Verifying Your Voting Details.. Please Wait.</h1>
      
              <div className="votecast-main-div">
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
              </div>
            </div>
          );
        break;
      }
    }
  }

  return(
    <div className="homepage-main-div">
      <div className="heading-div">
        <label className="logo-name">VotingSystem</label>
        <div className="menu-Item">
          <div className="menu-icons"><HiMenuAlt3/></div>
          <div className="menu-icons" onClick={redirectToHome}><GoHome/></div>
          <div className="menu-icons" onClick={logoutFunction}><FiLogOut/></div>
        </div>
      </div>

      {/* Body Div */}

      {
        filterDiv()
      }
    </div>
   )

 }

export default UserPage