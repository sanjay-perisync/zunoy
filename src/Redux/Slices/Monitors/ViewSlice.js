import { createSlice } from "@reduxjs/toolkit";

const ViewMonitorSlice = createSlice({
    name: "View",
    initialState: [],
    reducers: {
        
        viewMonitorSuccess: (state, action) => {
            return action.payload || [];
        },
        
        DeleteMonitorSuccess: (state, action) => {
            return action.payload?.data || [];
        },
       
        ResetState: () => [],
    },
});

export const { viewMonitorSuccess,DeleteMonitorSuccess, ResetState } = ViewMonitorSlice.actions;

export default ViewMonitorSlice.reducer;