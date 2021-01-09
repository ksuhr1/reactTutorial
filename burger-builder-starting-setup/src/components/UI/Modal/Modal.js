import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
/* If modal is shown, the backdrop should be shown */
class Modal extends Component {
  /* this helps to not update unless Modal is clicked */
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show
  }

  componentDidUpdate() {
    console.log('[Modal]ComponentWillUpdate')
  }

  render() {
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
