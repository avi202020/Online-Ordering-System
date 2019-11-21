import { LOG_IN_OUT } from '../actions/types';
const INITIAL_STATE = {
  isSignedIn: false,
  token: null
}

export default (state= INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_OUT:
      return {
        ...state,
        isSignedIn: action.payload.status,
        token: action.payload.token        
      }
    default:
      return state;
  }
}