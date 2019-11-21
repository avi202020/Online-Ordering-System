import { combineReducers } from 'redux';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import addressReducer from "./addressReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
  auth: authReducer,
  orders: orderReducer,
  address: addressReducer,
  payment: paymentReducer,
})
