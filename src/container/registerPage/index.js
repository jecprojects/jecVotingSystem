import React, {useState} from 'react';
import './style.css';

import {NavLink, Redirect} from 'react-router-dom'; 

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from 'react-redux';
import { RegisterAction } from '../../redux/actions/authAction';

// Material Ui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRollNumber, setUserRollNumber] = useState('');

  // For SnackBar
  const [open, setOpen] = useState(false);

    // Redirect To Home Page When Logged In
    if (auth.authenticate) {
      return <Redirect to={"/"} />;
    }

  // Material Ui alert Function
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
    
  // For Closing of Snack Bar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  // This event will run when Someone Cliked the Register Butotn
  const userRegisterEventListener = (e) => {
    e.preventDefault();
    const userObj = {
      userEmail, userPassword, userRollNumber
    }
    dispatch(RegisterAction(userObj));
    setUserEmail('');
    setUserPassword('');
    setUserRollNumber('');
    setOpen(true);
  }


  // Snackbar div
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
    <div className="register_left_div">
      <h2>Registration</h2>
      <label>Please keep Your Password Safe. If you forget your Password you can't login again.
        Enter <span>Email</span>, <span>College RollNumber</span>, <span>Password</span> and Click on Register Button. <sup>*</sup>We will Send You An Email Verification Link.
      </label>


      <ValidatorForm className="form_div" useref="form" onSubmit={userRegisterEventListener}>
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
          placeholder="180710007192"
          value={userRollNumber}
          type="number"
          variant="outlined"
          validators={["required", "minStringLength:12", "maxStringLength:12"]}
          errorMessages={[
            "this field is required",
            "Minimum Length should be 12",
            "Maximum Length should be 12",
          ]}
          onChange={(e) => setUserRollNumber(e.target.value)}
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

        <button className="login_btn">Register</button>
      </ValidatorForm>


      <NavLink to="/login">Already Registered? Please Login</NavLink>
    </div>

    <div className="login_right_div">
        {
          open ? showSnackBar() : null
        } 
    </div>
  </div>
   )

 }

export default RegisterPage