import React from 'react';
import './Person.css';
import Radium from 'radium';

//state less componenets because it's not managing a state
// want way more of these components
// presentational dumb componenet
const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  };

  return (
    <div className="Person" style = {style}>
        <p onClick={props.click}> I'm {props.name} bitch and I am {props.age} years old! </p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
};

export default Radium(person);
