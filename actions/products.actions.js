"use server";

// ** Next, React And Locals Imports
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCTS_BY_CATEGORY,
  ADD_PRODUCT_REVIEW,
  GET_SEARCH_RESULTS,
} from "@/graphql/Products";

export async function fetchProductsAPI(variables) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCTS,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.getProducts;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductByNameAPI(name) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCT_BY_NAME,
        variables: { name },
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    if (data?.getProductByName) {
      return data.getProductByName;
    } else {
      redirect("/404");
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchProductsByCategoryAPI(category) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { category },
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getProductsByCategory;
  } catch (error) {
    throw error;
  }
}

export async function addProductReviewAPI(variables) {
  try {
    const cookieStore = await cookies();

    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: ADD_PRODUCT_REVIEW,
        variables,
      }),
      next: { revalidate: 0 },
    });

    const { data } = await response.json();

    return data?.addProductReview;
  } catch (error) {
    throw error;
  }
}

export async function fetchSearchResultsAPI(searchTerm) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_SEARCH_RESULTS,
        variables: { searchTerm },
      }),
      next: { revalidate: 60 },
    });

    const { data } = await response.json();

    return data?.getSearchResults;
  } catch (error) {
    throw error;
  }
}
