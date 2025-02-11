// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {},
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { getCustomer } = customer.actions;

export default customer.reducer;
