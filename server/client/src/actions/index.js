import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';
const SIDE_URL = 'http://localhost:8080';

export const FETCH_PRODUCTS = 'FETCH_SITES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const SET_MAX = 'SET_MAX';


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

export function fetchCategories() {
  let url = SIDE_URL + "/categories"; 
  
  console.log("fetchCategories was called")
  
  const request = axios.get(url);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

// export function createCategory(category) {
//   let url = ROOT_URL + "/categories"; 

//   // I need to figure out body
//   const request = axios.post(url);

//   return {
//     type: FETCH_PRODUCTS,
//     payload: request
//   };
// }

// export function updateCategory(category) {
//   let url = ROOT_URL + "/categories"; 

//   // I need to figure out body
//   const request = axios.post(url);

//   return {
//     type: FETCH_PRODUCTS,
//     payload: request
//   };
// }