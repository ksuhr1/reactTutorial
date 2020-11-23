import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js'

const App = (props) => {
  // use state returns array of two elements
  // and always two elements
  // first element: current state
  // second element: function that allows you to update state
  // use aray destructoring []
  const [personsState, setPersonsState] = useState({
    persons: [
      {name: 'Max', age: 28 },
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value'

  });

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  // method
  const switchNameHandler = () => {
    // DON'T DO THIS: personsState.persons[0].name = 'Katy';

    // this will override persons but not change other state
    setPersonsState({
      persons:[
      {name: 'Katy', age: 27 },
      {name: 'Tim', age: 24},
      {name: 'Stephanie', age: 26}
    ],
      otherState: personsState.otherState
    });
  }



  // render() {
    return (
      <div className="App">
      <h1> Hi, I'm a React App</h1>
      <p> This is working</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name}  age={personsState.persons[1].age} > My hob bies: singing</Person>
      <Person name={personsState.persons[2].name}  age={personsState.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  // }
}

// state = {
//   persons: [
//     {name: 'Max', age: 28 },
//     {name: 'Manu', age: 29},
//     {name: 'Stephanie', age: 26}
//   ],
//   otherState: 'some other value'
//
// }
//
//


export default App;
