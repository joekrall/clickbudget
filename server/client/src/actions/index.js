import axios from 'axios';

const URL = 'http://localhost:8000';

export const FETCH_SITES = 'FETCH_SITES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_SITES = 'UPDATE_SITES';
export const SET_MAX = 'SET_MAX';


export function fetchSites(aggregate = true) {
  let url = URL + "/sites"; 
  console.log("fetchSites was called")
  
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
  let url = URL + "/categories"; 
  
  console.log("fetchCategories was called")
  
  const request = axios.get(url);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function createCategory(category) {
  let url = URL + "/categories"; 

  // I need to figure out body
  console.log("createCategory was called")

  const params = new URLSearchParams();
  if (category !== null) {
    params.append('name', category)
  }

  const request = axios({
    method: 'post',
    url: url,
    data: params
  });

  return {
    type: CREATE_CATEGORY,
    payload: request
  };
}

export function updateCategory(categoryId, siteName, maxVisits) {
  let url = URL + "/categories" + "/" + categoryId; 

  console.log("updateCategory was hit")
  console.log("siteName is " + siteName)
  console.log("maxVisits is " + maxVisits)

  const params = new URLSearchParams();
  if (siteName !== null) {
    params.append('site', siteName)
    console.log("we appended " + siteName)
  }
  if (maxVisits !== null) {
    console.log("we appended " + maxVisits)
    params.append('maxVisits', maxVisits);
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
  let url = URL + "/sites" 

  console.log("updateSites was called")
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