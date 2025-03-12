import { createSlice } from "@reduxjs/toolkit";

const AccountDetailsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        GetAccDetailsSuccess: (state, action) => {
            return action.payload?.data || [];
            
        },
        ResetProductsState: () => [],
       
    },
});

export const { GetAccDetailsSuccess, ResetProductsState } = AccountDetailsSlice.actions;

export default AccountDetailsSlice.reducer;