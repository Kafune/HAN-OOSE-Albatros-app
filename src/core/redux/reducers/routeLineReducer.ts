import {MapsCoordinate} from '../../maps/MapsCoordinate';
import {MapsLine} from '../../maps/MapsLine';

const initialState = new MapsLine([]);

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
