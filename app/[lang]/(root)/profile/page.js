// ** Next, React And Locals Imports
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import ProfileSettings from "@/components/Profile/ProfileSettings/ProfileSettings";

export const metadata = {
  title: "My Profile",
};

export default async function Profile({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();

  return <ProfileSettings dict={dict} customerData={customerData} />;
}
