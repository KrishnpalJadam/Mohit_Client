"use server";

// ** Next, React And Locals Imports
import { GET_PRODUCT_SETTINGS } from "@/graphql/ProductSettings";

export async function fetchProductSettingsAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCT_SETTINGS,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getProductSettings;
  } catch (error) {
    throw error;
  }
}
