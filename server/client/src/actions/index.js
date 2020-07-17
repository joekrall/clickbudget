import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCTS = 'FETCH_SITES';
//export const SET_AGGREGATION = 'SET_AGGREGATION';


export function fetchSites(aggregate = true) {
  let url = ROOT_URL + "/sites"; 
  
  if (aggregate) {
    url += "?aggregate=true";
  }

  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}