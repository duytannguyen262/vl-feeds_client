import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
  },
});

const { reducer, actions } = posts;
export const { addPost } = actions;
export default reducer;
