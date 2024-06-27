import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filter",
  initialState: { name: "" },
  reducers: {
    changeFilter(state, action) {
      state.name = action.payload;
    },
    resetFilter(state) {
      state.name = "";
    },
  },
});

export const { changeFilter, resetFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
