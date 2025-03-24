import { createSlice } from "@reduxjs/toolkit";

const ViewGraphSlice = createSlice({
    name: "View",
    initialState: [],
    reducers: {
        
        
        PillGraphSuccess: (state, action) => {
            return action.payload || [];
        }
        // ,
        // LineGraphSuccess: (state, action) => {
        //     return action.payload || [];
        // }
        ,
       
        ResetState: () => [],
    },
});

export const { PillGraphSuccess, ResetState } = ViewGraphSlice.actions;

export default ViewGraphSlice.reducer;