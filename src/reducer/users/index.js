const initialState = {
  users: [],
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return { ...state, users: payload };
    default:
      return state;
  }
};

export default usersReducer;

export const setUsers = (users) => {
  return { type: "SET_USERS", payload: users };
};
