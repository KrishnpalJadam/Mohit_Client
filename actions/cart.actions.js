"use server";

// ** Next, React And Locals Imports
import { cookies } from "next/headers";
import {
  GET_CART,
  ADD_TO_CART,
  CHANGE_CART_QUANTITY,
  DELETE_FROM_CART,
} from "@/graphql/Cart";

export async function fetchCartAPI() {
  try {
    // Cart id
    const cookieStore = await cookies();
    let cartId = cookieStore.get("cart_id")?.value;

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: GET_CART,
        variables: { cartId },
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.getCart;
  } catch (error) {
    throw error;
  }
}

export async function addToCartAPI(variables) {
  try {
    // Cart id
    const cookieStore = await cookies();
    let cartId = cookieStore.get("cart_id")?.value;

    // Pushing cartId to variables
    variables.cartId = cartId;

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: ADD_TO_CART,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    const cartData = data?.addToCart;

    // If response is okay, and `cart_id` is not in cookies, set the cookie
    if (cartData?._id && !cartId) {
      cartId = cartData._id;

      cookieStore.set("cart_id", cartId, {
        maxAge: 1296000, // 15 Days in seconds
        httpOnly: true,
        secure: true, // Works only on https
        sameSite: "strict", // Works only on https
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname, // store domain
      });
    }

    return cartData;
  } catch (error) {
    throw error;
  }
}

export async function changeCartQuantityAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CHANGE_CART_QUANTITY,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.changeCartQuantity;
  } catch (error) {
    throw error;
  }
}

export async function deleteFromCartAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: DELETE_FROM_CART,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.deleteFromCart;
  } catch (error) {
    throw error;
  }
}
