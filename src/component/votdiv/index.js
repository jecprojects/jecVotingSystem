import React, { useState } from 'react';

import './style.css';


const VoteDiv = (props) => {
    console.log(props.candidate)

    const [ value, setValue ] = useState();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    console.log(value);
    return(
        <div className="voting-div"> 
            <div className="l-div">
                <img src={props.candidate.L1.imageURL}/>
                <label className="c-name">{props.candidate.L1.fullName}</label>
                <label className="c-post">{props.candidate.L1.position}</label>

                <div className="wrapper">
                    <input 
                        type="radio" 
                        checked={value === props.candidate.L1.fullName} 
                        value={props.candidate.L1.fullName} 
                        onChange={handleChange} 
                        name={props.candidate.L1.position} 
                        id={props.candidate.L1.fullName}
                    />
                    <label for={props.candidate.L1.fullName} class="option option-1">
                        <span>{value === props.candidate.L1.fullName ? 'Voted' : 'Vote'}</span>
                    </label>
                </div>
            </div>
            <div className="l-div">
                <img src={props.candidate.L2.imageURL}/>
                <label className="c-name">{props.candidate.L2.fullName}</label>
                <label className="c-post">{props.candidate.L2.position}</label>

                <div className="wrapper">
                    <input 
                        type="radio" 
                        checked={value === props.candidate.L2.fullName} 
                        value={props.candidate.L2.fullName} 
                        onChange={handleChange} 
                        name={props.candidate.L2.position} 
                        id={props.candidate.L2.fullName}
                    />
                    <label for={props.candidate.L2.fullName} class="option option-2">
                        <span>{value === props.candidate.L2.fullName ? 'Voted' : 'Vote'}</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default VoteDiv;