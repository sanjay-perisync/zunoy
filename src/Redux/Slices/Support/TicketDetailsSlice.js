import { createSlice } from "@reduxjs/toolkit";

const TicketDetailsSlice = createSlice({
    name: "supportTicketsinfo",
    initialState: {},
    reducers: {
        TicketinfoSuccess: (state, action) => {
            // console.log(action.payload);

            return action.payload?.data || [];
        },
        ResetTicketsState: () => ({
            tickets: [],
        }),
    },
});

export const { TicketinfoSuccess, ResetTicketsState } = TicketDetailsSlice.actions;
export default TicketDetailsSlice.reducer;