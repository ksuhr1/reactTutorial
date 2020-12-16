import React, {Component, Fragment} from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

//state less componenets because it's not managing a state
// want way more of these components
// presentational dumb componenet
class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.inputElementRef.current.focus();

    console.log(this.context.authenticated);
    // this.inputElement.focus();
    //document.querySelector('input').focus();
  }
  render() {
      console.log('[Person.js] rendering...')
      return (
        <Aux>

            {this.context.authenticated ? <p> Authenticated</p> : <p> Please log in</p>}

            <p onClick={this.props.click}>
              I'm {this.props.name} and I am {this.props.age} years old!
            </p>
            <p key="i2">{this.props.children}
            </p>
            <input
              key="i3"
              ref={this.inputElementRef}
              // ref={(inputEl) => {this.inputElement = inputEl}}
              type="text"
              onChange={this.props.changed}
              value={this.props.name}
            />
        </Aux>
      );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};


export default withClass(Person, classes.Person);
