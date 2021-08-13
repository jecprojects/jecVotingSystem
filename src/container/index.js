import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserData } from '../redux/actions/authAction';

/**
* @author
* @function HomePage
**/

const HomePage = (props) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(auth){
        dispatch(getUserData());
    }
  },[])

  const redirectFunction = () => {
    switch(auth.user.role){
        case 'user':
            return <Redirect to={'/user'}/>
        break;

        case 'miner':
            return <Redirect to={'/miner'}/>
        break;
    }
  }


  return(
    <>
        {
            auth.user ? 
                redirectFunction()
            :

            <label>Redirecting...</label>
        }
    </>
  );
 }


export default HomePage