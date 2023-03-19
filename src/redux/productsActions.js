import { ActionTypes } from "./action-types";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
export const removeSelectedProduct = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};

export const setTrees = (trees) => {
  return {
    type: ActionTypes.SET_TREES,
    payload: trees,
  };
};

export const selectedTree = (tree) => {
  return {
    type: ActionTypes.SELECTED_TREE,
    payload: tree,
  };
};
export const removeSelectedTree = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_TREE,
  };
};