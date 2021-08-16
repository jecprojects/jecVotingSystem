import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CancelDataRequest } from '../../redux/actions/cancelRequestAction';
import { VerifyDataRequest } from '../../redux/actions/verifyRequestAction';
import './style.css';

/**
* @author
* @function PendingDiv
**/

const PendingDiv = (props) => {

  const dispatch = useDispatch()
  
  const verifyVoter = () => {
    dispatch(VerifyDataRequest(props.req.voter));
  }

  const cancelVoter = () => {
    dispatch(CancelDataRequest(props.req.voter));
  }

  
  return(
    <div className="verify-details-div">
      <div className="verify-details-div-top">
        <label className="voter">{props.req.voter}</label>
        <label className="votedOn">{props.req.votedOn}</label>
      </div>
      <div className="verify-details-div-bottom">
        <label className="hash">{props.req.hash}</label>
      </div>

      <div className="right-div"> 
        <Button onClick={cancelVoter} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={verifyVoter} variant="contained" color="primary">
          Verify
        </Button>
      </div>
    </div>
   )

 }

export default PendingDiv