import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

/* use object keys to transform to an array */
class OrderSummary extends Component {
  // This could be a functional ccomponent, doesn't have to be a class
  componentDidUpdate() {
    console.log('[Order summary] willUpdate')
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key ={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li> );
    });
    return(
      <Aux>
        <h3> Your Order </h3>
        <p> A delicious burger with the following ingredients:
        </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p> Continue to Checkout ? </p>
        <Button btnType="Danger" clicked={this.props.purchasedCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchasedContinued}>CONTINUE</Button>
      </Aux>

    );
  }
}

export default OrderSummary;
