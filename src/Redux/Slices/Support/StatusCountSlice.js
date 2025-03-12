import { createSlice } from "@reduxjs/toolkit";

const StatusSlice = createSlice({
    name: "status",
    initialState: [],
    reducers: {
        StatusSuccess: (state, action) => {
            console.log(action.payload);
            
            return action.payload?.data?.data || [];
            
        },
        ResetProductsState: () => [],
       
    },
});

export const { StatusSuccess, ResetProductsState } = StatusSlice.actions;

export default StatusSlice.reducer;