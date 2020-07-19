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

// What needs to happen here is that updateCategory will require
// three arguments - we always get categoryId, but siteName AND maxClickNumber
// will be null depending on where its called. But then we can put search params
// on body.data. And then, the server can see what is NULL and what is not.
export function updateCategory(categoryId, siteName, maxClickNumber) {
  let url = SIDE_URL + "/categories" + "/" + categoryId; 

  console.log("updateCategory was hit")

  const params = new URLSearchParams();
  if (siteName !== null) {
    params.append('site', siteName)
  }
  if (maxClickNumber !== null) {
    params.append('maxClicks', maxClickNumber);
  }

  console.log(params);

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

export function updateSites(siteName, categoryName, categoryId) {
  let url = MAIN_URL + "/sites" 


  const params = new URLSearchParams();
  params.append('category', categoryName);
  params.append('url', siteName)
  params.append('categoryId', categoryId)
  const request = axios({
    method: 'put',
    url: url,
    data: params
  });

  return {
    type: UPDATE_SITES,
    payload: request,
    
  };
}