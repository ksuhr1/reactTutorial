import React from 'react';
import './Person.css';

//state less componenets because it's not managing a state
// want way more of these components
// presentational dumb componenet
const person = (props) => {
  return (
    <div className="Person">
        <p onClick={props.click}> I'm {props.name} bitch and I am {props.age} years old! </p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
};

export default person;
