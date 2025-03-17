import { combineReducers } from "@reduxjs/toolkit";
import GuestSlice from "./GuestSlice";
import AddGuestSlice from "./AddGuestSlice";



const guestSliceReducer = combineReducers({
    GuestSlice,
    AddGuestSlice
});

export default guestSliceReducer 