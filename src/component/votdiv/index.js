import React from 'react';

import img1 from '../../resources/L1/L1GS.png';
import './style.css';


const VoteDiv = (props) => {
    console.log(props.candidate)
    return(
        <div className="voting-div"> 
            <div className="l-div">
                <img src={img1}/>
                <label className="c-name">{props.candidate.L1.fullName}</label>
                <label className="c-post">{props.candidate.L1.position}</label>
            </div>
            <div className="l-div">
                <img src={img1}/>
                <label className="c-name">{props.candidate.L2.fullName}</label>
                <label className="c-post">{props.candidate.L2.position}</label>
            </div>
        </div>
    );
}

export default VoteDiv;