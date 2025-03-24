import { createSlice } from "@reduxjs/toolkit";

const MonitorSlice = createSlice({
    name: "Monitors",
    initialState: [],
    reducers: {
        MonitorslistSuccess: (state, action) => {
            return action.payload?.data?.data || []; 
        },
        AddMonitorSuccess: (state, action) => {
            return [...state, action.payload];
        },
        DeleteMonitorSuccess: (state, action) => {
            const idToDelete = action.payload; 
            return state.filter((monitor) => monitor.id !== idToDelete);
        },
        ResetState: () => [],
    },
});

export const { MonitorslistSuccess, AddMonitorSuccess,DeleteMonitorSuccess, ResetState } = MonitorSlice.actions;

export default MonitorSlice.reducer;