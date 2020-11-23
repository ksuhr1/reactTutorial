import React, { Component } from 'react';
import classes from  './App.css';
import Person from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Max', age: 28 },
      {id: '2', name: 'Manu', age: 29},
      {id: '3', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false

  }

  nameChangedHandler = (event, id) => {
    // find person index
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // get actual person

    // distribute all properties of object we fetch into new
    // object we are creating
    const person = {
      ...this.state.persons[personIndex]
    };

    // alternative copy object
    //const person = Object .assign({}, this.state.persons[personIndex]);

    // don't want to mutate reference types directly

    // update person name
    person.name = event.target.value;

    // update array at position we fetched
    const persons = [...this.state.persons];

    //update person
    persons[personIndex] = person;
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    // current state
    const doesShow = this.state.showPersons;
    // set state merges to the author state
    this.setState({showPersons: !doesShow});
  }


  deletePersonHandler = (personIndex) => {
    // 1) fetch all the persons
    // slice copies array
    // const persons = this.state.persons.slice();
    // use spread operator using objects from old array
    const persons = [...this.state.persons];

    // removes 1 element from array
    persons.splice(personIndex, 1);
    // set persons to persons constant which
    // was updated
    this.setState({persons: persons});

  }
  // everything in render is always called
  //this will take individual elements of array
  // and render them to the DOM if they are valid jsx
  render() {
    let persons = null;
    let btnClass = '';


    if (this.state.showPersons) {
      // set persons to jsx code
      persons = (
        <div>
          <Person
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
        </div>
      );
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }

    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }
    return (
        <div className={classes.App}>
        <h1> Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}> This is working</p>
        <button className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons
        </button>
        {persons}
        </div>
    );



    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
