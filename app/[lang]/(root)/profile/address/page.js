// ** Next, React And Locals Imports
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import AddressComp from "@/components/Profile/Address/Address";

export const metadata = {
  title: "My Address",
};

export default async function Address({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();

  return <AddressComp dict={dict} customerData={customerData} />;
}
