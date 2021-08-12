
import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';

// All Page Links
import HomePage from './container/homePage';
import LoginPage from './container/loginPage';
import RegisterPage from './container/registerPage';
import AllVotingPage from './container/allVotingPage';


import {getUserData, IsUserLoggedIn} from './redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';


import PrivateRoute from './component/privateRoute';


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
      </Switch>
    </div>
  );
}

export default App;