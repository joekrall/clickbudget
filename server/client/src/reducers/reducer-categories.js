import { FETCH_CATEGORIES } from '../actions/index';

export default function( state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log(action.payload.data);
      return action.payload.data; 
    default:
      return state;
  }
}