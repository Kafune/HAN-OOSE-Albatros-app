const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...action.payload,
      };
    }

    case 'SET_POINTS': {
      return {
        ...state,
        totalScore: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
