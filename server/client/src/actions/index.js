import axios from 'axios';

const MAIN_URL = 'http://localhost:8000';
const SIDE_URL = 'http://localhost:8080';

export const FETCH_SITES = 'FETCH_SITES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_SITES = 'UPDATE_SITES';
export const SET_MAX = 'SET_MAX';


export function fetchSites(aggregate = true) {
  let url = MAIN_URL + "/sites"; 
  
  if (aggregate) {
    url += "?aggregate=true";
  }

  const request = axios.get(url);
  return {
    type: FETCH_SITES,
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

export function updateCategory(categoryId, siteName) {
  let url = SIDE_URL + "/categories" + "/" + categoryId; 

  console.log("updateCategory was hit")

  const params = new URLSearchParams();
  params.append('site', siteName)
  const request = axios({
    method: 'put',
    url: url,
    data: params
  });

  return {
    type: UPDATE_CATEGORY,
    payload: request
  };
}

export function updateSites(siteName, categoryName) {
  let url = MAIN_URL + "/sites" 

  console.log("updateSites was hit")

  const params = new URLSearchParams();
  params.append('category', categoryName);
  params.append('url', siteName)
  const request = axios({
    method: 'put',
    url: url,
    data: params
  });

  return {
    type: UPDATE_SITES,
    payload: request
  };
}