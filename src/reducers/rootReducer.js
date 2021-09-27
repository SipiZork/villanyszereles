const initialState = {
  rooms: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOMS':
      return {...state, rooms: action.payload}
    default:
      return {...state}
  }
};

export default rootReducer;