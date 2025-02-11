"use server";

// ** Next, React And Locals Imports
import { GET_HOMEPAGE } from "@/graphql/Homepage";

export async function fetchHomeAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_HOMEPAGE,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getHomepage;
  } catch (error) {
    throw error;
  }
}
