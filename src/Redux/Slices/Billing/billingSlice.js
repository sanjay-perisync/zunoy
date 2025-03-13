import { createSlice } from "@reduxjs/toolkit";

const billingdetailsSlice = createSlice({
    name: "BillingAddress",
    initialState: [],
    reducers: {
        BillingSuccess: (state, action) => {
            return action.payload?.data?.data || [];
        },
        ResetBillingState: () => ({
            billing: [],
        }),
    },
});

export const { BillingSuccess, ResetBillingState } = billingdetailsSlice.actions;
export default billingdetailsSlice.reducer;