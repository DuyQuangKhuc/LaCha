import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer, selectedTreesReducer, treesReducer } from "./productsReducer";
const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  allTrees: treesReducer,
  tree: selectedTreesReducer,
});
export default reducers;