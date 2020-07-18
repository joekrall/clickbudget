import { combineReducers } from 'redux';
import SitesReducer from './reducer-sites';
import CategoriesReducer from './reducer-categories';


const rootReducer = combineReducers({

  siteData: SitesReducer, 
  categoryData: CategoriesReducer

});

export default rootReducer;