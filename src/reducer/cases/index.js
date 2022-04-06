const initialState = {
  cases: [],
  caseById: [],
  caseEmergency1: [],
  caseEmergency2: [],
};
const casesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CASES":
      return { ...state, cases: payload };

    case "SET_CASE":
      return { ...state.caseById, caseById: payload };
    case "SET_CASE1":
      return { ...state.caseById, caseEmergency1: payload };
    case "SET_CASE2":
      return { ...state.caseById, caseEmergency2: payload };

    case "ADD_CASE":
      return { ...state, cases: [...state.cases, payload] };

    case "UPDATE_CASE":
      return {
        ...state,
        cases: state.cases.map((ele) => {
          if (payload.id == ele.id) {
            return payload;
          }
          return ele;
        }),
      };

    case "DELETE_CASE":
      return {
        ...state,
        cases: state.cases.filter((cases) => {
          return cases.id != payload;
        }),
      };

    default:
      return state;
  }
};

export default casesReducer;

export const setCases = (cases) => {
  return {
    type: "SET_CASES",
    payload: cases,
  };
};

export const AddCase = (newCase) => {
  return { type: "ADD_CASE", payload: newCase };
};

export const updateCases = (updateCase) => {
  return { type: "UPDATE_CASE", payload: updateCase };
};

export const deleteCase = (id) => {
  return { type: "DELETE_CASE", payload: id };
};

export const setCase = (caseById) => {
  return {
    type: "SET_CASE",
    payload: caseById,
  };
};

export const setCaseEmergency1 = (caseById) => {
  return {
    type: "SET_CASE1",
    payload: caseById,
  };
};

export const setCaseEmergency2 = (caseById) => {
  return {
    type: "SET_CASE2",
    payload: caseById,
  };
};
