import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateBillingAddress } from "../../../APIconfig/PutApiconfig";


export const saveBillingAddress = createAsyncThunk(
  "billing/saveBillingAddress",
  async (billingData, { rejectWithValue }) => {
    try {
      const updatedData = await updateBillingAddress(billingData);
      if (!updatedData) throw new Error("Failed to update billing address");
      return updatedData; 
    } catch (error) {
      return rejectWithValue(error.message || "Error updating billing address");
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billingInfo: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setBillingInfo: (state, action) => {
      state.billingInfo = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBillingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBillingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.billingInfo = action.payload; 
      })
      .addCase(saveBillingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { setBillingInfo } = billingSlice.actions; 
export default billingSlice.reducer;
