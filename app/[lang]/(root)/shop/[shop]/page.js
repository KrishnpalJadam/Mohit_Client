// ** Next, React And Locals Imports
import { fetchProductsAPI } from "@/actions/products.actions.js";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import ShopComp from "@/components/Shop/Shop";

export const metadata = {
  title: "Shop",
};

export default async function Shop({ params }) {
  const { lang, shop } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const productsData = await fetchProductsAPI({
    page: 0,
    limit: 8,
    category: shop !== "all" ? shop : [],
  });

  const productSettingsData = await fetchProductSettingsAPI();

  return (
    <ShopComp
      dict={dict}
      pathname={shop === "all" ? null : shop}
      productsData={productsData}
      productSettingsData={productSettingsData}
    />
  );
}
