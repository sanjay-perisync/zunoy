// /* eslint-disable */
// import { createSlice } from "@reduxjs/toolkit";

// const IncidentsViewSlice = createSlice({
//   name: "GET_INCIDENT_VIEW_SUCCESS",
//   initialState: null,
//   reducers: {
//     GetIncidentsViewSuccess: (state, action) => {
//       return action?.payload?.data;
//     },
//     UpdateIncidentSuccess: (state, action) => {
//       return { ...state, assigned: action?.payload?.res?.data };
//     },
//     UpdateLastTagSuccess: (state, action) => {
//       return {
//         ...state, lastTag: action?.payload?.newComment?.tag
//       };
//     },
//     ToggleIncidentSuccess: (state, action) => {
//       return { ...state, state: action?.payload?.data?.state };
//     },
//     DeleteIncidentSuccess: (state, action) => {
//       return null;
//     },
//     ResetState: (state, action) => {
//       return null;
//     },
//   },
// });

// export const {
//   GetIncidentsViewSuccess,
//   UpdateIncidentSuccess,
//   ToggleIncidentSuccess,
//   UpdateLastTagSuccess,
//   DeleteIncidentSuccess,
//   ResetState,
// } = IncidentsViewSlice.actions;
// export default IncidentsViewSlice.reducer;
