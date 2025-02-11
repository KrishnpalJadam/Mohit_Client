// ** Next, React And Locals Imports
import { fetchCartAPI } from "@/actions/cart.actions.js";
import { fetchShippingAPI } from "@/actions/shipping.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import CartComp from "@/components/Cart/Cart/Cart";

export const metadata = {
  title: "My Cart",
};

export default async function Cart({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const cartData = await fetchCartAPI();
  const shippingData = await fetchShippingAPI();

  // Shipping
  const shippingFees = shippingData?.fees;
  const shippingFeesMinValue = shippingData?.minValue;

  return (
    <CartComp
      dict={dict}
      cartData={cartData}
      shippingFees={shippingFees}
      shippingFeesMinValue={shippingFeesMinValue}
    />
  );
}
