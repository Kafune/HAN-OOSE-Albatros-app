const initialState = {};

const walkedRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WALKED_ROUTE': {
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
