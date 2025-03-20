import { createSlice } from "@reduxjs/toolkit";

const MonitorSlice = createSlice({
    name: "Monitors",
    initialState: [],
    reducers: {
        MonitorslistSuccess: (state, action) => {
            return action.payload?.data?.data || [];
            
        },
        AddMonitorSuccess: (state, action) => {
            // console.log("slice data:",action.payload?.data?.data);
            
            return [...state, action.payload];
            // return [...state, action.payload?.data?.data];
        },
        viewMonitorSuccess: (state, action) => {
            // console.log(action.payload);

            return action.payload || [];
        },
       
        ResetState: () => [],
    },
});

export const { MonitorslistSuccess, AddMonitorSuccess,viewMonitorSuccess, ResetState } = MonitorSlice.actions;

export default MonitorSlice.reducer;