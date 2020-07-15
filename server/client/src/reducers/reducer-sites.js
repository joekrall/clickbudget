import { FETCH_PRODUCTS } from '../actions/index';

// Note the structure of the default state
// This is significant for allowing ProductList to mount successfully
export default function( state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data; 
    default:
      return state;
  }
}