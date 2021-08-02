import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authAction';

import { NavLink } from 'react-router-dom';

import {HiMenuAlt3} from 'react-icons/hi';
import {FiX, FiLogOut} from 'react-icons/fi';
import {GoHome} from 'react-icons/go';
import './style.css';
import VoteDiv from '../../component/votdiv';
import { getCandidateAction } from '../../redux/actions/candidateAction';
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

  useEffect(() => {
    dispatch(getCandidateAction());
  },[])


  return(
    <div className="homepage-main-div">
      {/* <NavLink to="/login" onClick={logoutFunction}>Logout</NavLink> */}
      <div className="heading-div">
        <label className="logo-name">JECvotingSystem</label>
        <div className="menu-Item">
          <div className="menu-icons"><HiMenuAlt3/></div>
          <div className="menu-icons"><GoHome/></div>
          <div className="menu-icons"><FiLogOut/></div>
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
            null
          }
        </div>
      </div>
    </div>
   )

 }

export default HomePage