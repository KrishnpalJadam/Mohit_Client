// ** Next, React And Locals Imports
import GoogleAnalytics from "@/components/Analytics/Analytics";
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

export default async function NoLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStore>
          <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
        </GlobalStore>
        {/* Progress bar */}
        <ProgressBar />
        {/* Google analytics */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
