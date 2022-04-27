import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("persist:root");
  }
}

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
  extraReducers: () => {},
});

const { reducer, actions } = auth;
export const { login, logout, updateUser } = actions;
export default reducer;
