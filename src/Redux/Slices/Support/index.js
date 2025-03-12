import { combineReducers } from "@reduxjs/toolkit";
import TicketSlice from "./TicketSlice";
import statusSlice from "./StatusCountSlice";
import TicketDetailsSlice from "./TicketDetailsSlice";
import ChatSlice from "./chatSlice";
import postCommentSlice from "./postComment";



const TicketSliceReducer = combineReducers({
    TicketSlice,
    statusSlice,
    TicketDetailsSlice,
    ChatSlice,
    postCommentSlice
});

export default TicketSliceReducer;