import {Route} from '../../domain/Route';

const initialState = new Route(-1, '', -1, '', [
  {
    id: -1,
    start: {latitude: -1, longitude: -1, altitude: -1},
    end: {latitude: -1, longitude: -1, altitude: -1},
  },
]);

const routeLineReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROUTE_LINE': {
      return {
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default routeLineReducer;
