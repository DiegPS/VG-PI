const initialState = {};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_GAMES":
      return {};
    default:
      return state;
  }
}
