import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authAction';
import { GetPendingRequestAction } from '../../redux/actions/pendingRequestAction';

import { NavLink, Redirect } from 'react-router-dom';

import { HiMenuAlt3 } from 'react-icons/hi';
import { FiX, FiLogOut } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';

import './style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Button } from '@material-ui/core';
import PendingDiv from '../../component/pendingdiv/pendingDiv';
import { GetVerifiedRequestAction } from '../../redux/actions/verifiedRequestAction';
import { GetCancelledRequestAction } from '../../redux/actions/cancelledRequestAction';
import { BlockChain } from '../../component/blockChain';
import { ResultData } from '../../component/result';


/**
* @author
* @function MinerPage
**/

const MinerPage = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const pendingRequest = useSelector(state => state.pendingRequest);
  const verifiedRequest = useSelector(state => state.verifiedRequest);
  const cancelledRequest = useSelector(state => state.cancelledRequest);




  const types = [
    { title: "pending" },
    { title: "Verified" },
    { title: "Cancelled" },
    { title: "BlockChain" },
    { title: "result" }
  ];

  const [active, setActive] = useState(types[0].title);

  const switchTabs = () => {
    switch (active) {
      case "pending":
        return(
          <>
            {
            pendingRequest.pendingRequest ? 
              pendingRequest.pendingRequest.map((req) => {
                return <PendingDiv key={req.voter} type="action" req={req}/>
              })
            :
  
            <label>Wait a Minute..</label>
          }
          </>
        );
        break;

      case "Verified":
        return(
          <>
          {
          verifiedRequest.verifiedRequest ? 
          verifiedRequest.verifiedRequest.map((req) => {
              return <PendingDiv key={req.voter} type="noaction" req={req}/>
            })
          :

          <label>Wait a Minute..</label>
        }
        </>
        );
        break;

      case "Cancelled":
        return(
          <>
            {
            cancelledRequest.cancelledRequest ? 
              cancelledRequest.cancelledRequest.map((req) => {
                  return <PendingDiv key={req.voter} type="noaction" req={req}/>
                })
              :

              <label>Wait a Minute..</label>
            }
          </>
        );
        break;

      case "BlockChain":
        return <BlockChain/>;
        break;

      case "result":
        return <ResultData/>;
        break;
      

      default:
        break;
    }
  };

  const logoutFunction = (e) => {
    dispatch(LogoutAction())
  }

  const redirectToHome = () => {
    <Redirect to="/miner" />
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(GetPendingRequestAction());
      dispatch(GetVerifiedRequestAction());
      dispatch(GetCancelledRequestAction());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(GetPendingRequestAction());
    dispatch(GetVerifiedRequestAction());
    dispatch(GetCancelledRequestAction());
  }, [])


  return (
    <div className="homepage-main-div">
      <div className="heading-div">
        <label className="logo-name">Verification</label>
        <div className="menu-Item">
          <div className="menu-icons"><HiMenuAlt3 /></div>
          <div className="menu-icons" onClick={redirectToHome}><GoHome /></div>
          <div className="menu-icons" onClick={logoutFunction}><FiLogOut /></div>
        </div>
      </div>

      <div className="main-body-div">
        <div className="nav-div">
          {types.map((type) => (
            <div
              key={type.title}
              active={active === type.title}
              onClick={() => setActive(type.title)}
            >
              {active === type.title ?
                <Button color="secondary">
                  {type.title}
                </Button>
                : 
                <Button>{type.title}</Button>
              }
            </div>
            ))}
      </div>
      <div className="main-body-of-miner">
        {switchTabs()}
      </div>

    </div>
    </div >
   )

 }

export default MinerPage