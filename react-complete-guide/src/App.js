import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28 },
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value'

  }


  // method
  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Katy';

    // this will override persons but not change other state
    this.setState({
      persons:[
      {name: newName, age: 27 },
      {name: 'Tim', age: 24},
      {name: 'Stephanie', age: 26}
      ]
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons:[
      {name: 'Koji', age: 27 },
      {name: event.target.value, age: 24},
      {name: 'Stephanie', age: 26}
      ]
    });
  }

  render() {
    const style = {
        backgroundColor: 'white',
        font:'inherit',
        border:'1px solid blue',
        paddding:'8px',
        cursor: 'pointer'
    };

    return (
      <div className="App">
      <h1> Hi, I'm a React App</h1>
      <p> This is working</p>
      <button
        style={style}
        onClick={()=> this.switchNameHandler('Katy Alexa')}>Switch Name</button>
      <Person
        name={this.state.persons[0].name}
        age={this.state.persons[0].age} />
      <Person
        name={this.state.persons[1].name}  age={this.state.persons[1].age}
        click={this.switchNameHandler.bind(this, 'Timothy Antonio')}
        changed={this.nameChangedHandler}> My hobbies: singing</Person>
      <Person
        name={this.state.persons[2].name}  age={this.state.persons[2].age} />
      </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
