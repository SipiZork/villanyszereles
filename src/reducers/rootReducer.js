const initialState = {
  rooms: '',
};

const rootReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_ROOMS':
      return {...state, rooms: action.payload}
    default:
      return {...state}
  }
};

export default rootReducer;