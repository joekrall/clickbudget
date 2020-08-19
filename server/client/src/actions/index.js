import axios from 'axios';

const URL = ''; // proxy: "http://localhost:8000"

export const FETCH_SITES = 'FETCH_SITES';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_SITES = 'UPDATE_SITES';
export const SET_MAX = 'SET_MAX';

// For fetchSites, getting sites by aggregating all (trimmed) urls
// is the default. Possible branch: create a way to toggle
// between aggregated and non-aggregated site displays
// on main page
export function fetchSites(aggregate = true) {

  let url = URL + "/sites"; 
  
  if (aggregate) { 
    url += "?aggregate=true";
  }

  const request = axios.get(url);
  return {
    type: FETCH_SITES,
    payload: request
  };
}

// Note: in order for sites to update correctly,
// updateSites must be called before deleteCategory
export function updateSites(siteName, categoryName, categoryId) {
  let url = URL + "/sites" 


  // Options for updating sites:
  // 1) categoryId = "none": we perform a category update
  // 2) Otherwise, we uncategorize all sites with the selected categoryId
  // With either option, all params are appended each time
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

export function fetchCategories() {

  let url = URL + "/categories"; 
    
  const request = axios.get(url);
  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function createCategory(category) {

  let url = URL + "/categories"; 

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
  const params = new URLSearchParams();

  // Two options for updating category:
  // add a site to the category or change the maxVisits
  if (siteName !== null) {
    params.append('site', siteName)
  }
  if (maxVisits !== null) {
    params.append('maxVisits', maxVisits);
  }

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


export function deleteCategory(categoryId) {
  let url = URL + "/categories" + "/" + categoryId; 

  const request = axios({
    method: 'delete',
    url: url
  });

  return {
    type: DELETE_CATEGORY,
    payload: request,
  };
}

