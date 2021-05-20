import {combineReducers} from 'redux';

import userReducer from './userReducer';
import routeLineReducer from './routeLineReducer';
import walkedRouteReducer from './walkedRouteReducer';

const rootReducer = combineReducers({
  user: userReducer,
  routeLine: routeLineReducer,
  walkedRoute: walkedRouteReducer,
});

export default rootReducer;
