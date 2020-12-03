import React, {Component} from 'react';
import Person from './Person/Person';

// Recieve persons from props

class Persons extends Component {
  // static getDerivedStateFromProps(props, state){
  //   console.log('[Person.js] getDerivedStateFromProps');
  //   return state;
  // }

  // outdated
  // componentWillReceiveProps(nextProps){
  //   console.log('[Persons.js] componentWillReceiveProps');
  // }
  shouldComponentUpdate(nextProps, nextState){
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message: 'Snapshot!'};

  }


  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[Perosns.js] componentDidUpdate')
    console.log(snapshot);
  }


  render() {
    console.log('[Person.js] rendering...');
    return this.props.persons.map( (person, index) => {
        return (
          <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id }
           changed={(event) => this.props.changed(event, person.id)}/>
       );
    });

  }

}

export default Persons;
