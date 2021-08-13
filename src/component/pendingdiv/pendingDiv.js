import { Button } from '@material-ui/core';
import React from 'react';
import './style.css';

/**
* @author
* @function PendingDiv
**/

const PendingDiv = (props) => {
  
  

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
        <Button variant="contained" color="primary">
          Verify
        </Button>
      </div>
    </div>
   )

 }

export default PendingDiv