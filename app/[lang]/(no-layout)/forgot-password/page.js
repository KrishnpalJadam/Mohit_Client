// ** Next, React And Locals Imports
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions";
import { getDictionary } from "@/locales/dictionaries.js";
import ForgotPasswordComp from "@/components/Auth/ForgotPassword/ForgotPassword";

export const metadata = {
  title: "Forgot password",
};

export default async function ForgotPassword({ params }) {
  const { lang } = await params;

  const siteSettings = await fetchSiteSettingsAPI();

  // Intl
  const dict = await getDictionary(lang);

  return (
    <ForgotPasswordComp dict={dict} websiteLogo={siteSettings?.websiteLogo} />
  );
}
