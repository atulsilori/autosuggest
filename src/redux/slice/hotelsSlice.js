import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action
export const fetchHotels = createAsyncThunk("fetchHotels", async () => {
  try {
    const response = await axios.get("http://localhost:3000/hotels");
    const data = await response.data;
    return data;
  } catch (e) {
    console.log("Error: ", e);
  }
});

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    // promise pending
    builder.addCase(fetchHotels.pending, (state, action) => {
      state.isLoading = true;
    });

    // promise resolved
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    // promise rejected
    builder.addCase(fetchHotels.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default hotelsSlice.reducer;
