// ** Next, React And Locals Imports
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions";
import LoginComp from "@/components/Auth/Login/Login";
import { getDictionary } from "@/locales/dictionaries.js";

export const metadata = {
  title: "Login",
};

export default async function Login({ params }) {
  const { lang } = await params;

  const siteSettings = await fetchSiteSettingsAPI();

  // Intl
  const dict = await getDictionary(lang);

  // Website logo
  const websiteLogo = siteSettings?.logo;

  return <LoginComp dict={dict} websiteLogo={websiteLogo} />;
}
