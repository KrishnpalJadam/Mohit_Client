// ** Next, React And Locals Imports
import { redirect } from "next/navigation";
import { fetchCartAPI } from "@/actions/cart.actions.js";
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions.js";
import { fetchShippingAPI } from "@/actions/shipping.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import CheckoutComp from "@/components/Checkout/Checkout";

export const metadata = {
  title: "Checkout",
};

export default async function Checkout({ params }) {
  const { lang, checkout } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();
  const cartData = await fetchCartAPI();
  const siteSettings = await fetchSiteSettingsAPI();
  const shippingData = await fetchShippingAPI();

  // Shipping
  const shippingFees = shippingData?.fees;
  const shippingFeesMinValue = shippingData?.minValue;

  const expectedDeliveryDays = shippingData?.expectedDelivery;

  const expectedDelivery = () => {
    const d = new Date();
    d.setDate(d.getDate() + expectedDeliveryDays);

    return new Date(d).toDateString();
  };

  //Redirecting to 404 page, if cartId not matches with cartData _id
  // Cart id (from link)
  const cartId = checkout.split("cart_id_")[1];

  if (cartData?._id !== cartId) {
    redirect("/404");
  }

  return (
    <CheckoutComp
      dict={dict}
      authenticatedCustomerProfile={customerData}
      cartData={cartData}
      siteSettings={siteSettings}
      shippingFees={shippingFees}
      shippingFeesMinValue={shippingFeesMinValue}
      expectedDelivery={expectedDelivery()}
    />
  );
}
