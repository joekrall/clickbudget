import axios from 'axios';


const ROOT_URL = 'http://localhost:8000/sites';

export const FETCH_PRODUCTS = 'FETCH_SITES';

export function fetchSites() {
  let url = ROOT_URL; 
  
  const request = axios.get(url);

  console.log(request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}