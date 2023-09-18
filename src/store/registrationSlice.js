import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    isValid: false,
  }, 
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setValid: (state, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { setEmail, setFirstName, setLastName, setPassword, setConfirmPassword, setValid } = registrationSlice.actions;

export default registrationSlice.reducer;
