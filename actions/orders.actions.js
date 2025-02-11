"use server";

// ** Next, React And Locals Imports
import { cookies } from "next/headers";
import {
  CREATE_ORDER,
  GET_CUSTOMER_ORDERS,
  GET_ORDER_BY_ID,
} from "@/graphql/Orders.js";

export async function createOrderAPI(variables) {
  try {
    // Cart id
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cart_id")?.value;

    // Pushing cartId to variables
    variables.cartId = cartId;

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CREATE_ORDER,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    const orderData = data?.createOrder;

    // On successful order creation, removing the cart from cookie
    if (orderData?._id) {
      cookieStore.set("cart_id", "", {
        maxAge: 0,
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname,
        path: "/",
      });
    }

    return orderData;
  } catch (error) {
    throw error;
  }
}

export async function fetchOrderByIdAPI(orderId) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: GET_ORDER_BY_ID,
        variables: { id: orderId },
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getOrderById;
  } catch (error) {
    throw error;
  }
}

export async function fetchCustomerOrdersAPI() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: GET_CUSTOMER_ORDERS,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getOrdersByCustomerId;
  } catch (error) {
    throw error;
  }
}
