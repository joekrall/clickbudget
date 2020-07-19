import { FETCH_SITES, UPDATE_SITES } from '../actions/index';

export default function( state = {totalVisitCount: 0, sites: [], categoryCounter: {}}, action) {
  switch (action.type) {
    case FETCH_SITES:
      return action.payload.data;
    case UPDATE_SITES:
      return state;
    default:
      return state;
  }
}