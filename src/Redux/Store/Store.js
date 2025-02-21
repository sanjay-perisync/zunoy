import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {}, // Empty reducer object if not using reducers yet
});

export default store;




// import { configureStore, createSlice } from "@reduxjs/toolkit";

// // Temporary dummy reducer
// const dummySlice = createSlice({
//   name: "dummy",
//   initialState: {},
//   reducers: {},
// });

// const store = configureStore({
//   reducer: {
//     dummy: dummySlice.reducer, // Add at least one reducer
//   },
// });

// export default store;
