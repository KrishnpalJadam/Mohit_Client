// ** Next, React And Locals Imports
import { redirect } from "next/navigation";
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions.js";
import { fetchOrderByIdAPI } from "@/actions/orders.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import PaymentSuccessComp from "@/components/PaymentStatus/Success/Success";

export const metadata = {
  title: "Payment success",
};

export default async function PaymentSuccess({ params }) {
  const { lang, success } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const siteSettings = await fetchSiteSettingsAPI();

  const orderId = success?.split("%3D")[1];

  // Redirecting to 404 if order id length is not 24
  if (!orderId?.length === 24) {
    redirect("/404");
  }

  const orderData = await fetchOrderByIdAPI(orderId);

  // Returning to 404 if order data not found
  if (!orderData?._id) {
    redirect("/404");
  }

  // Checking whether the order is placed by guest customer or not
  const customerId = orderData?.customer?.customerId?.split("-");
  const isGuestOrder = customerId?.length > 1;

  return (
    <PaymentSuccessComp
      dict={dict}
      orderData={orderData}
      isGuestOrder={isGuestOrder}
      socials={siteSettings?.socials}
    />
  );
}
