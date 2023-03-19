import { ActionTypes } from "./action-types";
const intialState = {
  products: [],
  trees: [],
};

export const productsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const treesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_TREES:
      return { ...state, trees: payload };
    default:
      return state;
  }
};

export const selectedTreesReducer = (state = {}, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SELECTED_TREE:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_TREE:
      return {};
    default:
      return state;
  }
};