const initialState = {

};

const highlightedRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HIGHLIGHTED_ROUTE': {
      return {
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default highlightedRouteReducer;
