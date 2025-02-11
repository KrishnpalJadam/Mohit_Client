// ** Next, React And Locals Imports
import { fetchWishlistProductsAPI } from "@/actions/customers.actions.js";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import WishlistComp from "@/components/Profile/Wishlist/Wishlist";

export const metadata = {
  title: "My Wishlist",
};

export default async function Wishlist({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const { products } = await fetchWishlistProductsAPI();
  const productSettings = await fetchProductSettingsAPI();

  return (
    <WishlistComp
      dict={dict}
      products={products}
      productSettings={productSettings}
    />
  );
}
