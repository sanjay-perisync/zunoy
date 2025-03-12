import { createSlice } from "@reduxjs/toolkit";

const productsListSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        GetProductsSuccess: (state, action) => {
            return action.payload?.data?.data || [];
            
        },
        ResetProductsState: () => [],
       
    },
});

export const { GetProductsSuccess, ResetProductsState, SetLoading } = productsListSlice.actions;

export default productsListSlice.reducer;