// ** Next, React And Locals Imports
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { fetchCouponsAPI } from "@/actions/coupons.actions.js";
import { getDictionary } from "@/locales/dictionaries.js";
import CouponsComp from "@/components/Profile/Coupons/Coupons";

export const metadata = {
  title: "Coupons",
};

export default async function Coupons({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const customerData = await fetchCustomerAPI();
  const coupons = await fetchCouponsAPI();

  return (
    <CouponsComp dict={dict} customerData={customerData} coupons={coupons} />
  );
}
