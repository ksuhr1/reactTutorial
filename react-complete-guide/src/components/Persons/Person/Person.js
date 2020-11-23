import React from 'react';
import classes from './Person.css';

// this returns a react component
// const StyledDiv = styled.div`
//     width: 60%;
//     margin: 16px auto;
//     border:1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;
//
//   @media(min-width: 500px) {
//       width: 450px;
//   }
//   `;


//state less componenets because it's not managing a state
// want way more of these components
// presentational dumb componenet
const person = (props) => {
  // const style = {
  //   '@media (min-width: 500px)': {
  //     width: '450px'
  //   }
  // };

  return (

    // <div className="Person" style = {style}>
    <div className={classes.Person}>
        <p onClick={props.click}> I'm {props.name} and I am {props.age} years old! </p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
};

export default person;
