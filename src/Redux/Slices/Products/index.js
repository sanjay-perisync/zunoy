import { combineReducers } from "@reduxjs/toolkit";
import productsListSlice from "./ProductSlice";



const productsSliceReducer = combineReducers({
    productsListSlice

});

export default productsSliceReducer;