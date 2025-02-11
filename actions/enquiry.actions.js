"use server";

// ** Next, React And Locals Imports
import { ENQUIRY } from "@/graphql/Enquiry.js";

export async function customerEnquiryAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ENQUIRY,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.customerEnquiry;
  } catch (error) {
    throw error;
  }
}
