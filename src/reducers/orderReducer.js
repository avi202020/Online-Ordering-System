import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/types';

/*
  {
    name: null,
    size: null,
    sugar: null,
    toppings: [],
    totalPrice: 0,
  }
*/
const INITIAL_STATE = [

]

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    case REMOVE_FROM_CART:
      return state.filter(item => item.name !== action.payload)
    case CLEAR_CART:
      return []
    default:
      return state;
  }
}