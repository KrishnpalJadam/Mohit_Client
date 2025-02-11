// ** Next, React And Locals Imports
import Script from "next/script";
import { cookies } from "next/headers";
import { fetchSiteSettingsAPI } from "@/actions/sitesettings.actions";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions";
import { fetchCartAPI } from "@/actions/cart.actions";
import { getDictionary } from "@/locales/dictionaries.js";
import GoogleAnalytics from "@/components/Analytics/Analytics";
import Layout from "@/components/Layout/Layout";
import ThemeRegistry from "@/components/Theme/ThemeRegistry";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import "../../globals.css";

// ** Redux store
import { GlobalStore } from "@/redux/store.js";

export const metadata = {
  title: "Fabyoh - Readymade Ecommerce Script",
  description:
    "Fabyoh is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({ params, children }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Site settings data
  const siteSettingsData = await fetchSiteSettingsAPI();

  // Product settings data
  const productSettingsData = await fetchProductSettingsAPI();

  // Cart data
  const cartData = await fetchCartAPI();

  // Checking if user is authenticated
  const authCookie = (await cookies()).get("access_token");
  const isAuth = !!authCookie;

  return (
    <html lang="en">
      <body>
        <GlobalStore>
          <ThemeRegistry options={{ key: "mui" }}>
            <Layout
              dict={dict}
              children={children}
              siteSettings={siteSettingsData}
              productSettings={productSettingsData}
              cart={cartData}
              isAuth={isAuth}
            />
          </ThemeRegistry>
        </GlobalStore>
        {/* Progress bar */}
        <ProgressBar />
        {/* Google analytics */}
        <GoogleAnalytics />
        {/* Tidio chat */}
        {/* <Script src={process.env.NEXT_PUBLIC_TIDIO_CHAT} /> */}
      </body>
    </html>
  );
}
