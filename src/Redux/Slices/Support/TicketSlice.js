// import { createSlice } from "@reduxjs/toolkit";

// const TicketSlice = createSlice({
//     name: "",
//     initialState: [],
//     reducers: {
//         TicketSuccess: (state, action) => {
//             return action.payload?.data || [];

//         },
//         ResetProductsState: () => [],

//     },
// });

// export const { TicketSuccess, ResetProductsState } = TicketSlice.actions;

// export default TicketSlice.reducer;





import { createSlice } from "@reduxjs/toolkit";

const TicketSlice = createSlice({
    name: "supportTickets",
    initialState: [],
    reducers: {
        TicketSuccess: (state, action) => {
            // console.log(action.payload?.data?.data);

            return action.payload?.data?.data || [];
        },
        ResetTicketsState: () => ({
            tickets: [],
        }),
    },
});

export const { TicketSuccess, ResetTicketsState } = TicketSlice.actions;
export default TicketSlice.reducer;
