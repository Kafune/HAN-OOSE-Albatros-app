import {combineReducers} from 'redux';

import userReducer from './userReducer';
import routeLineReducer from './routeLineReducer';
import walkedRouteReducer from './walkedRouteReducer';
import activitiesReducer from './activitiesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  routeLine: routeLineReducer,
  walkedRoute: walkedRouteReducer,
  activities: activitiesReducer,
});

export default rootReducer;
