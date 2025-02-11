// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { getCart } = cart.actions;

export default cart.reducer;
