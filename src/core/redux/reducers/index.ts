import {combineReducers} from 'redux';


import userReducer from './userReducer';
import routeLineReducer from './routeLineReducer';


const rootReducer = combineReducers({
  user: userReducer,
  routeLine: routeLineReducer,
});

export default rootReducer;
