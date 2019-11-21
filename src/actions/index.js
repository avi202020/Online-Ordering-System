import { 
  LOG_IN_OUT,
  CHECK_OUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBMIT_ADDRESS,
  SUBMIT_PAYMENT
} from './types';

export const logInOut = option => {
  return {
    type: LOG_IN_OUT,
    payload: option
  }
};

export const checkOut = () => {
  return {
    type: CHECK_OUT
  }
}

export const addToCartAction = option => {
  return {
    type: ADD_TO_CART,
    payload: option
  }
};

export const removeFromCartAction = option => {
  return {
    type: REMOVE_FROM_CART,
    payload: option
  }
};

export const addressAction = option => {
  return {
    type: SUBMIT_ADDRESS,
    payload: option
  }
}

export const paymentAction = option => {
  return {
    type: SUBMIT_PAYMENT,
    payload: option
  }
}