import {combineReducers} from 'redux';

import userReducer from './userReducer';
import highlightedRouteReducer from './highlightedRouteReducer';


const rootReducer = combineReducers({
  user: userReducer,
  highlightedRoute: highlightedRouteReducer,
});

export default rootReducer;
