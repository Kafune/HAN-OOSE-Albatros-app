const initialState = {};

const walkedRouteReducer = (state = initialState, action) => {
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

export default walkedRouteReducer;
