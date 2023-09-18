import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    isValid: false,
    isAuthenticated: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setValid: (state, action) => {
      state.isValid = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isValid = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setPassword, setValid, logout } = authSlice.actions;

export default authSlice.reducer;
