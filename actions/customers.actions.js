"use server";

// ** Next, React And Locals Imports
import { cookies } from "next/headers";
import {
  GET_CUSTOMER,
  CUSTOMERS,
  GET_WISHLIST_PRODUCTS,
  ADD_TO_WISHLIST,
} from "@/graphql/Customers";

export async function fetchCustomerAPI() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: GET_CUSTOMER,
      }),
      next: { revalidate: 5 },
    });

    const { data } = await response.json();

    return data?.getCustomer;
  } catch (error) {
    throw error;
  }
}

export async function customersAPI(variables) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: CUSTOMERS,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.customers;
  } catch (error) {
    throw error;
  }
}

export async function addToWishlistAPI(productId) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: ADD_TO_WISHLIST,
        variables: { productId },
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.addToWishlist;
  } catch (error) {
    throw error;
  }
}

export async function fetchWishlistProductsAPI() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: GET_WISHLIST_PRODUCTS,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getWishlistProducts;
  } catch (error) {
    throw error;
  }
}
