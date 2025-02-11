// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipping: {},
};

const shipping = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    getShipping: (state, action) => {
      state.shipping = action.payload;
    },
  },
});

export const { getShipping } = shipping.actions;

export default shipping.reducer;
