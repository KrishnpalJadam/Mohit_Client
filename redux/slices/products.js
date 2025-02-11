// ** Third Party Imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getMoreProducts: (state, action) => {
      state.products.push(...action.payload);
    },
  },
});

export const { getProducts, getMoreProducts } = products.actions;

export default products.reducer;
