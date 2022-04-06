const initialState = {
  images: [],
};

const imagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_IMAGES":
      return { ...state, images: payload };

    case "ADD_IMAGE":
      return { ...state, images: [...state.images, payload] };

    default:
      return state;
  }
};

export default imagesReducer;

export const setImages = (images) => {
  return { type: "SET_IMAGES", payload: images };
};

export const addImage = (newImage) => {
  return { type: "ADD_IMAGE", payload: newImage };
};
