import { createSlice } from "@reduxjs/toolkit";

const GuestSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        GuestlistSuccess: (state, action) => {
            return action.payload?.data?.data || [];
            
        },
        AddGuestSuccess: (state, action) => {
            return [...state, action.payload?.data];
        },
        UpdateGuestSuccess:(state,action)=>{
            return state.map((guest) => 
                guest.id === action.payload?.data?.id ? action.payload?.data : guest
            );
        },
        DeleteGuestSuccess:(state,action)=>{
            return state.filter((guest) => guest.id !== action.payload?.id);
        },
        ResetState: () => [],
    },
});

export const { GuestlistSuccess,AddGuestSuccess,UpdateGuestSuccess,DeleteGuestSuccess, ResetState } = GuestSlice.actions;

export default GuestSlice.reducer;