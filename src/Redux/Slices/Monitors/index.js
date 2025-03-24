import { combineReducers } from "@reduxjs/toolkit";
import MonitorSlice from "./MonitorSlice";
import ViewMonitorSlice from "./ViewSlice";
import ViewGraphSlice from "./GraphSlice";
import LineviewGraphSlice from "./LineGraphSlice";





const MonitorSliceReducer = combineReducers({
    MonitorSlice,
    ViewMonitorSlice,
    ViewGraphSlice,
    LineviewGraphSlice
    
});

export default MonitorSliceReducer 