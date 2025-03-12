import { createSlice } from "@reduxjs/toolkit";

const ChatSlice = createSlice({
    name: "supportTicketsinfo",
    initialState: [],
    reducers: {
        chatSuccess: (state, action) => {
            return action.payload?.data?.data || [];
        },
        ResetTicketsState: () => ({
            tickets: [],
        }),
    },
});

export const { chatSuccess, ResetTicketsState } = ChatSlice.actions;
export default ChatSlice.reducer;