import { FETCH_CATEGORIES, UPDATE_CATEGORY, CREATE_CATEGORY, DELETE_CATEGORY } from '../actions/index';

export default function( state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.data;
    case CREATE_CATEGORY:
      return state;
    case UPDATE_CATEGORY:
      return state;
    case DELETE_CATEGORY:
      return state;
    default:
      return state;
  }
}