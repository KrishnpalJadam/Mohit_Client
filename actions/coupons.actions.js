"use server";

// ** Next, React And Locals Imports
import { GET_COUPONS, CHECK_COUPON } from "@/graphql/Coupons";

export async function fetchCouponsAPI() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_COUPONS,
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getCoupons;
  } catch (error) {
    throw error;
  }
}

export async function checkCouponAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CHECK_COUPON,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.checkCoupon;
  } catch (error) {
    throw error;
  }
}
