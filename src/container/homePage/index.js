import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authAction';

import { NavLink, Redirect } from 'react-router-dom';

import {HiMenuAlt3} from 'react-icons/hi';
import {FiX, FiLogOut} from 'react-icons/fi';
import {GoHome} from 'react-icons/go';
import VoteDiv from '../../component/votdiv';
import { getCandidateAction } from '../../redux/actions/candidateAction';

import './style.css';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  const dispatch = useDispatch();


  // const auth = useSelector(state => state.auth);
  const candidates = useSelector(state => state.candidates);

  console.log(candidates);

  const logoutFunction = (e) => {
    dispatch(LogoutAction())
  }

  const redirectToHome = () => {
    <Redirect to="/" />
  }

  useEffect(() => {
    dispatch(getCandidateAction());
  },[])


  return(
    <div className="homepage-main-div">
      <div className="heading-div">
        <label className="logo-name">JECvotingSystem</label>
        <div className="menu-Item">
          <div className="menu-icons"><HiMenuAlt3/></div>
          <div className="menu-icons" onClick={redirectToHome}><GoHome/></div>
          <div className="menu-icons" onClick={logoutFunction}><FiLogOut/></div>
        </div>
      </div>

      {/* Body Div */}

      <div className="main-body-div">

        <h1>Cast Your Vote</h1>

        <div className="votecast-main-div">
          {
            candidates.candidates ? candidates.candidates.map(candidate => {
              return <VoteDiv candidate={candidate}/>
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
      </div>
    </div>
   )

 }

export default HomePage