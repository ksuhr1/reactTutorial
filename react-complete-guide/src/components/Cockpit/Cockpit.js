import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  // runs for every update
  // useEffect is componentDidMount and componentDidUpdate in one effect
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // HTTP request...
    const timer = setTimeout(() => {
      alert('Saved data to the cloud');
    }, 1000);
    return () => {
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []
);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nds useEffect');
    };
  });


  const assignedClasses = [];
  let btnClass = '';


  if(props.showPersons) {
    btnClass = classes.Red;
  }


  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }

  if(props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return(
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}> This is working</p>
      <button className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
      </div>


  );
};

export default cockpit;
