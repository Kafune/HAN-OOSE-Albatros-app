const initialState = {
  AllActivities: [],
};

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES': {
      return {
        AllActivities: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default activitiesReducer;
