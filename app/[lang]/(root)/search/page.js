// ** Next, React And Locals Imports
import { getDictionary } from "@/locales/dictionaries.js";
import { fetchSearchResultsAPI } from "@/actions/products.actions";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions";
import SearchResults from "@/components/SearchResults/SearchResults";

export const metadata = {
  title: "Search results",
};

export default async function SearchPage({ params, searchParams }) {
  const { lang } = await params;
  const { query } = await searchParams;

  // Intl
  const dict = await getDictionary(lang);

  // Search results data
  const searchResults = query ? await fetchSearchResultsAPI(query) : [];

  // Product settings data
  const productSettings = await fetchProductSettingsAPI();

  return (
    <SearchResults
      dict={dict}
      products={searchResults}
      productSettings={productSettings}
    />
  );
}
