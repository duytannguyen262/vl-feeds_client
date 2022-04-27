import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
  },
});

const { reducer, actions } = filter;
export const { searchFilterChange } = actions;
export default reducer;
