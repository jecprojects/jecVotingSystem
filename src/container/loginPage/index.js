import React, { useState } from 'react';
import './style.css';

import {NavLink, Redirect} from 'react-router-dom'; 
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from 'react-redux';

import { LoginAction } from '../../redux/actions/authAction';

// Material Ui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Material UI
  // const classes = useStyles();
  const [open, setOpen] = useState(true);

  // Redirect To Home Page When Logged In
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }


  // Material Ui alert Function
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const loginEventListener = (e) => {
    // Login Function to Login
    const userObj = {
      userEmail,
      userPassword
    }

    // Dispatching Action
    dispatch(LoginAction(userObj));
    setUserEmail('');
    setUserPassword('');
    setOpen(true);
  }

  const showSnackBar = () => {
    switch (auth.messageType) {
      case 'req':
        return(
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open} 
            autoHideDuration={10000} 
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="info">
              {auth.message}
            </Alert>
          </Snackbar>
        );
        break;
      case 'suc':
        return(
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open} 
            autoHideDuration={10000} 
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {auth.message}
            </Alert>
          </Snackbar>
        );
        break;

      case 'flr':
        return(
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open} 
            autoHideDuration={10000} 
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {auth.message}
            </Alert>
          </Snackbar>
        );
      break;
    
      default:
        break;
    }
  }

  return(
    <div className="login_main_div">
      <div className="login_left_div">
        <h1>JECVoting</h1>
        <h2>Login to Continue.</h2>
        <label>Only a logged In User can Vote and access all pages. So To Vote and Access all the pages Please Login.</label>


        <ValidatorForm className="form_div" useref="form" onSubmit={loginEventListener}>
        <TextValidator
          className="input_field"
          placeholder="example@gmail.com"
          value={userEmail}
          type="email"
          variant="outlined"
          validators={[
            "required",
            "matchRegexp:^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*.[a-zA-Z]{2,7})$",
          ]}
          errorMessages={[
            "this field is required",
            "Email is not valid",
          ]}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <TextValidator
          className="input_field"
          placeholder="********"
          value={userPassword}
          type="text"
          variant="outlined"
          validators={["required", "minStringLength:8"]}
          errorMessages={[
            "this field is required",
            "Minimum Length should be 8",
          ]}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <button className="login_btn">Login</button>
      </ValidatorForm>


        <NavLink to="/register">Don't have an Account? Register Here.</NavLink>
      </div>

      <div className="login_right_div">
        {
          open ? showSnackBar() : null
        }
      </div>
    </div>
   )

 }

export default LoginPage;