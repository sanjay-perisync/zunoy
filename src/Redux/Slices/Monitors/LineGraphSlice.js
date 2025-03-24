import { createSlice } from "@reduxjs/toolkit";

const LineviewGraphSlice = createSlice({
    name: "View",
    initialState: [],
    reducers: {
        
        LineGraphSuccess: (state, action) => {
            return action.payload?.data || [];
        },
       
        ResetState: () => [],
    },
});

export const { LineGraphSuccess, ResetState } = LineviewGraphSlice.actions;

export default LineviewGraphSlice.reducer;