import React, { Component } from 'react';
import classes from  './App.css';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

//this container manages state and maniputlates state

class App extends Component {

  // set up state
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');

    this.state = {
      persons: [
        {id: '1', name: 'Max', age: 28 },
        {id: '2', name: 'Manu', age: 29},
        {id: '3', name: 'Stephanie', age: 26}
      ],
      otherState: 'some other value',
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false,

    }
  }

  static getDerivedStateFromProps(props, state){

    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }


  /* These 3 lifecycle hooks are the most important */

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[App.js] componentDidUpdate');
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
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter+1
      };
    });
  }

  togglePersonsHandler = () => {
    // current state
    const doesShow = this.state.showPersons;
    // set state merges to the author state
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };


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

  };
  // everything in render is always called
  //this will take individual elements of array
  // and render them to the DOM if they are valid jsx
  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      // set persons to jsx code
      persons = (
          <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated} />
      );
    }


    return (
        <Aux>
          <button onClick={() => {
              this.setState({showCockpit:false});
            }}
          > Remove Cockpit
          </button>
          <AuthContext.Provider value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler}}>
              {this.state.showCockpit ? (
              <Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
                />
            ) : null}
            {persons}
          </AuthContext.Provider>
      </Aux>
    );



    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
