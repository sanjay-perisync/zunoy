
// /* eslint-disable */
// import { createSlice } from "@reduxjs/toolkit"

// const IncidentsListSlice = createSlice({
//     name: "GET_INCIDENTS_LIST_SUCCESS",
//     initialState: [],
//     reducers: {
//         GetIncidentsListSuccess: (state, action) => {
//             if (action?.payload?.data?.data === null) {
//                 return []
//             } else {
//                 return action?.payload?.data?.data
//             }

//         },
//         DeleteTeamMatesSuccess: (state, action) => {
//             return state?.filter((data) => data.id !== action.payload.id)
//         },
//         ToggleTeamMatesSuccess: (state, action) => {
//             return state?.map((d) => {
//                 if (action.payload.id === d.id) {
//                     return { ...d, active: !action?.payload?.active }
//                 } else {
//                     return d
//                 }
//             })
//         },
//         ResetState: (state, action) => {
//             return null
//         }
//     }
// })

// export const { GetIncidentsListSuccess, DeleteTeamMatesSuccess, ToggleTeamMatesSuccess, ResetState } = IncidentsListSlice.actions
// export default IncidentsListSlice.reducer
