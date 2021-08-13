import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, LogoutAction } from '../../redux/actions/authAction';
import { GetPendingRequestAction } from '../../redux/actions/pendingRequestAction';

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
import PendingDiv from '../../component/pendingdiv/pendingDiv';
/**
* @author
* @function MinerPage
**/

const MinerPage = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const pendingRequest = useSelector(state => state.pendingRequest);


  const logoutFunction = (e) => {
    dispatch(LogoutAction())
  }

  const redirectToHome = () => {
    <Redirect to="/miner" />
  }

  useEffect(() => {
    dispatch(GetPendingRequestAction())
  }, [])



  return(
    <div className="homepage-main-div">
      <div className="heading-div">
        <label className="logo-name">Verification</label>
        <div className="menu-Item">
          <div className="menu-icons"><HiMenuAlt3/></div>
          <div className="menu-icons" onClick={redirectToHome}><GoHome/></div>
          <div className="menu-icons" onClick={logoutFunction}><FiLogOut/></div>
        </div>
      </div>

      <div className="main-body-div">
        {
          pendingRequest.pendingRequest ? 
            pendingRequest.pendingRequest.map((req) => {
              return <PendingDiv req={req}/>
            })
          :

          <label>Wait a Minute..</label>
        }
      </div>
    </div>
   )

 }

export default MinerPage