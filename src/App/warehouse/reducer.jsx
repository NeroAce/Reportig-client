const reducer = (state, action) => {
  if (action.type === "USER_DETAIL") {
    return {
      ...state,
      name: action.payload.name,
      position: action.payload.position,
    };
  }

  return state;
};

export default reducer;
