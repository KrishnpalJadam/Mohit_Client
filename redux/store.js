"use client";

// ** Next, React And Locals Imports
import { Provider } from "react-redux";

// ** Third Party Imports
import { configureStore } from "@reduxjs/toolkit";

// ** Slices
import productSettings from "./slices/productSettings.js";
import products from "./slices/products.js";
import shipping from "./slices/shipping.js";
import cart from "./slices/cart.js";
import customer from "./slices/customer.js";

const store = configureStore({
  reducer: {
    productSettings,
    products,
    shipping,
    cart,
    customer,
  },
});

export const GlobalStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
