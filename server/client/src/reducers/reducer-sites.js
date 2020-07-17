import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action.payload.data);
      return action.payload.data; 
    default:
      return state;
  }
}