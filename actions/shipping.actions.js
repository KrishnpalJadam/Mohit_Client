"use server";

// ** Next, React And Locals Imports
import { GET_SHIPPING_FEES } from "@/graphql/Shipping";

export async function fetchShippingAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_SHIPPING_FEES,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getShipping;
  } catch (error) {
    throw error;
  }
}
