// ** Next, React And Locals Imports
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import ChangePasswordComp from "@/components/Profile/ChangePassword/ChangePassword";

export const metadata = {
  title: "Change password",
};

export default async function ChangePassword({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();

  return <ChangePasswordComp dict={dict} customerData={customerData} />;
}
