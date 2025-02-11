"use server";

// ** Next, React And Locals Imports
import { ADD_TO_NEWSLETTER } from "@/graphql/Newsletter";

export async function addToNewsletterAPI(email) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ADD_TO_NEWSLETTER,
        variables: { email },
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.newsletter;
  } catch (error) {
    throw error;
  }
}
