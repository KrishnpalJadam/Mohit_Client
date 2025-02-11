// ** Next, React And Locals Imports
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions";
import { getDictionary } from "@/locales/dictionaries.js";
import RegisterComp from "@/components/Auth/Register/Register";

export const metadata = {
  title: "Register",
};

export default async function Register({ params }) {
  const { lang } = await params;

  // Data
  const siteSettings = await fetchSiteSettingsAPI();

  // Intl
  const dict = await getDictionary(lang);

  // Website logo
  const websiteLogo = siteSettings?.logo;

  return <RegisterComp dict={dict} websiteLogo={websiteLogo} />;
}
