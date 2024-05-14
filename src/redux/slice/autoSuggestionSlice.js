import { createSlice } from "@reduxjs/toolkit";

export const autoSuggestionSlice = createSlice({
  name: "counter",
  initialState: {
    inputOptions: { loading: false },
    selectedOption: { type: "", id: "" },
  },
  reducers: {
    setOptions: (state, action) => {
      state.inputOptions = { ...action.payload };
    },
    setSelectedOptions: (state, action) => {
      state.selectedOption = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOptions, setSelectedOptions } = autoSuggestionSlice.actions;

export default autoSuggestionSlice.reducer;
