"use server";

// ** Next, React And Locals Imports
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  CHANGE_CUSTOMER_PASSWORD,
  SEND_VERIFICATION_CODE,
  FORGOT_PASSWORD,
} from "@/graphql/Auth";

export async function sendVerificationCodeAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SEND_VERIFICATION_CODE,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.sendVerificationCode;
  } catch (error) {
    throw error;
  }
}

export async function resetPasswordAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: FORGOT_PASSWORD,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.resetPassword;
  } catch (error) {
    throw error;
  }
}

export async function changePasswordAPI(variables) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: CHANGE_CUSTOMER_PASSWORD,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    // Remove the access_token & cart_id on successful password change
    if (data?.changeCustomerPassword?.status === 200) {
      cookieStore.set("access_token", "", {
        maxAge: 0,
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname,
        path: "/",
      });

      cookieStore.set("cart_id", "", {
        maxAge: 0,
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname,
        path: "/",
      });
    }

    return data?.changeCustomerPassword;
  } catch (error) {
    throw error;
  }
}

export async function logoutAPI() {
  try {
    const cookieStore = await cookies();
    const hasTokenCookie = cookieStore.has("access_token");
    const hasCartCookie = cookieStore.has("cart_id");

    if (hasTokenCookie) {
      cookieStore.set("access_token", "", {
        maxAge: 0,
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname,
        path: "/",
      });
    }

    if (hasCartCookie) {
      cookieStore.set("cart_id", "", {
        maxAge: 0,
        domain: new URL(process.env.NEXT_PUBLIC_CLIENT_URL).hostname,
        path: "/",
      });
    }

    redirect("/login");
  } catch (error) {
    throw error;
  }
}
