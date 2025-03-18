import { createSlice } from "@reduxjs/toolkit";

const MonitorSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        MonitorslistSuccess: (state, action) => {
            return action.payload?.data?.data || [];
            
        },
       
        ResetState: () => [],
    },
});

export const { MonitorslistSuccess, ResetState } = MonitorSlice.actions;

export default MonitorSlice.reducer;