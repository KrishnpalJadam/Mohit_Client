"use server";

// ** Next, React And Locals Imports
import { GET_SITE_SETTINGS } from "@/graphql/SiteSettings";

export async function fetchSiteSettingsAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_SITE_SETTINGS,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getSiteSettings;
  } catch (error) {
    throw error;
  }
}
