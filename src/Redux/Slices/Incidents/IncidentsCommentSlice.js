// /* eslint-disable */
// import { createSlice } from "@reduxjs/toolkit";

// const IncidentsCommentsSlice = createSlice({
//   name: "GET_INCIDENTS_COMMENTS_SUCCESS",
//   initialState: [],
//   reducers: {
//     GetIncidentsCommentsSuccess: (state, action) => {
//       if (action?.payload?.data === null) {
//         return [];
//       } else {
//         return action?.payload?.data;
//       }
//     },
//     AddCommentsSuccess: (state, action) => {
//       return [action.payload?.res?.data].concat(state);
//     },
//     DeleteCommentSuccess: (state, action) => {
//       return state?.filter((data) => data.id !== action.payload.id);
//     },
//     ToggleCommentSuccess: (state, action) => {
//       return state?.map((d) => {
//         if (action.payload.data.id === d.id) {
//           return { ...d, hide: action.payload.data?.hide };
//         } else {
//           return d;
//         }
//       });
//     },
//     ResetState: (state, action) => {
//       return null;
//     },
//   },
// });

// export const {
//   GetIncidentsCommentsSuccess,
//   DeleteCommentSuccess,
//   AddCommentsSuccess,
//   ToggleCommentSuccess,
//   ResetState,
// } = IncidentsCommentsSlice.actions;
// export default IncidentsCommentsSlice.reducer;
