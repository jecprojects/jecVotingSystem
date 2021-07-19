import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authAction';

import { NavLink } from 'react-router-dom';
import './style.css';

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  const dispatch = useDispatch();

  // const auth = useSelector(state => state.auth);


  const logoutFunction = (e) => {
    dispatch(LogoutAction())
  }



  return(
    <div>
      <NavLink to="/login" onClick={logoutFunction}>Logout</NavLink>
    </div>
   )

 }

export default HomePage