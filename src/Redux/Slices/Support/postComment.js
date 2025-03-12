import { createSlice } from "@reduxjs/toolkit";

const postCommentSlice = createSlice({
    name: "supportTicketsinfo",
    initialState: [],
    reducers: {
        chatCommentSuccess: (state, action) => {
            console.log("action details:",action.payload);

            // return action.payload?.data || [];
            return action.payload?.data?.data || [];
        },
        ResetTicketsState: () => ({
            tickets: [],
        }),
    },
});

export const { chatCommentSuccess, ResetTicketsState } = postCommentSlice.actions;
export default postCommentSlice.reducer;