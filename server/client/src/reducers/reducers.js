import { combineReducers } from 'redux';
import SitesReducer from './reducer-sites';


const rootReducer = combineReducers({

  siteData: SitesReducer, 

});

export default rootReducer;