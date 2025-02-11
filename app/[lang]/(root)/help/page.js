// ** Next, React And Locals Imports
import { getDictionary } from "@/locales/dictionaries.js";
import HelpComp from "@/components/Help/Help";

export const metadata = {
  title: "Help",
};

export default async function Help({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  return <HelpComp dict={dict} />;
}
