"use server";

// ** Next, React And Locals Imports
import { GET_STATIC_PAGES } from "@/graphql/StaticPages";

export async function fetchStaticPagesAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_STATIC_PAGES,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getStaticPages;
  } catch (error) {
    throw error;
  }
}
