import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  //keys = names of ingredients
  //values = amount
  state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false,

  }
  // good place for fetching updatePurchaseState
  componentDidMount(){
    axios.get('https://reactburgerconfigurator-default-rtdb.firebaseio.com/ingredients.json').then(response => {
      this.setState({ingredients: response.data});
    })
    .catch(error => {
      this.setState({error: true});
    } );
  }


  // this keyword will not work if function is triggered by an event
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  updatePurchaseState(ingredients) {
    /* ingredients we are analyzing is the old state */
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    // will create an array of string entries of
    // the state
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    // purchaseable if ingredient is at least onne
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler  = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }


  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction= INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);


  }

  /* Want to cancel purshasing when we close modal */
  purchaseCancelHandler = () =>  {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // should recalculate price on server
      customer: {
        name:'Katelyn Suhr',
        address: {
          street: "Heaven Ct",
          zipCode: "99999",
          country: "Germany"
        },
        email: 'test@test.com',
      },
      deliveryMethod:'fastest',

    }
    axios.post('/orders.json', order)
    .then(response => {
        this.setState({loading: false, purchasing: false});
    })
    .catch(error => {
        this.setState({loading: false, purchasing: false});
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    // disabledInfoKey is the value of each keys
    // will be updated with true or false in the
    // copied object
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
              />
        </Aux>
      );
      orderSummary = <OrderSummary
          purchasedCanceled={this.purchaseCancelHandler}
          purchasedContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />;
    }

    if(this.state.loading) {
      orderSummary = <Spinner />;
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>

    );

  }
}


export default withErrorHandler(BurgerBuilder, axios);
