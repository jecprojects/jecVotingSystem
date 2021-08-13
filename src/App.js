
import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';

// All Page Links
import HomePage from './container/index';
import LoginPage from './container/loginPage';
import RegisterPage from './container/registerPage';
import AllVotingPage from './container/allVotingPage';


import {getUserData, IsUserLoggedIn} from './redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';


import PrivateRoute from './component/privateRoute';
import MinerPage from './container/minerPage';
import UserPage from './container/userPage';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){ 
      dispatch(IsUserLoggedIn());
    }
  },[])
  useEffect(() => {
      dispatch(getUserData());
  },[])

  return (
    <div>
      <Switch>
        <PrivateRoute path="/" exact component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <PrivateRoute path="/allvotings" component={AllVotingPage}/>
        <PrivateRoute path="/miner" component={MinerPage}/>
        <PrivateRoute path="/user" component={UserPage}/>
      </Switch>
    </div>
  );
}

export default App;