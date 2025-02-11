// ** Next, React And Locals Imports
import { redirect } from "next/navigation";
import { fetchOrderByIdAPI } from "@/actions/orders.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import ViewOrderComp from "@/components/Profile/Orders/Order";

export const metadata = {
  title: "My Order",
};

export default async function ViewOrder({ params }) {
  const { lang, order } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Order id
  const orderId = order;

  // Redirecting to 404 if order id length is not 24
  if (!order?.length === 24) {
    redirect("/404");
  }

  const orderData = await fetchOrderByIdAPI(orderId);

  // Redirecting to 404 if order data not exist
  if (!orderData?._id) {
    redirect("/404");
  }

  const customerData = orderData.customer;

  return (
    <ViewOrderComp
      dict={dict}
      customerData={customerData}
      orderData={orderData}
      guest={false}
    />
  );
}
