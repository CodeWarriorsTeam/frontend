const initialState = {
  volunteers: [],
};

const volunteerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VOLUNTEERS":
      return { ...state, volunteers: payload };

    case "ADD_VOLUNTEER":
      return { ...state, volunteers: [...state.volunteers, payload] };

    default:
      return state;
  }
};
export default volunteerReducer;

export const setVolunteers = (volunteers) => {
  return { type: "SET_VOLUNTEERS", payload: volunteers };
};

export const addVolunteer = (newVolunteer) => {
  return { type: "ADD_VOLUNTEER", payload: newVolunteer };
};
