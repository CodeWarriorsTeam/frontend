const initialState = {
  donations: [],
};

const donationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_DONATION":
      return { donations: [...state.donations, payload] };

    default:
      return state;
  }
};

export default donationReducer;

export const addDonation = (newDonation) => {
  return { type: "ADD_DONATION", payload: newDonation };
};
