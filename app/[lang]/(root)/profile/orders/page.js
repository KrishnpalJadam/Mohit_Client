// ** Next, React And Locals Imports
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { fetchCustomerOrdersAPI } from "@/actions/orders.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import AllOrders from "@/components/Profile/Orders/AllOrders";

export const metadata = {
  title: "My Orders",
};

export default async function Orders({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();
  const orders = await fetchCustomerOrdersAPI();

  return <AllOrders dict={dict} customerData={customerData} orders={orders} />;
}
