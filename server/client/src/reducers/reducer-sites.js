import { FETCH_PRODUCTS } from '../actions/index';

export default function( state = {totalVisitCount: 0, sites: []}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data; 
    default:
      return state;
  }
}