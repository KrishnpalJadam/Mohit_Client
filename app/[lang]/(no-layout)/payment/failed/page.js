// ** Next, React And Locals Imports
import { getDictionary } from "@/locales/dictionaries.js";
import PaymentFailedComp from "@/components/PaymentStatus/Failed/Failed";

export const metadata = {
  title: "Payment failed",
};

export default async function PaymentFailed({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  return <PaymentFailedComp dict={dict} />;
}
