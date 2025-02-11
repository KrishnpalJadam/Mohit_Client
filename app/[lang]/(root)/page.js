// ** Next, React And Locals Imports
import { fetchHomeAPI } from "@/actions/home.actions";
import { fetchProductsAPI } from "@/actions/products.actions";
import { fetchProductSettingsAPI } from "@/actions/productsettings.actions";
import { getDictionary } from "@/locales/dictionaries.js";
import Hero from "@/components/Home/Hero/Hero";
import Marquee from "@/components/Home/Marquee/Marquee";
import SubHero from "@/components/Home/SubHero/SubHero";
import Products from "@/components/Products/Cards";
import RiskReducers from "@/components/Home/RiskReducers/RiskReducers";
import Spotlight from "@/components/Home/Spotlight/Spotlight";
import ShopByCategory from "@/components/Home/ShopByCategory/ShopByCategory";
import Newsletter from "@/components/Home/Newsletter/Newsletter";
import TrendingProducts from "@/components/Home/TrendingProducts/TrendingProducts";
import CookieConsent from "@/components/Home/CookieConsent/CookieConsent";

export default async function Home({ params }) {
  const { lang } = await params;

  // Intl
  const dict = await getDictionary(lang);

  // Data
  const homepage = await fetchHomeAPI();
  const productsData = await fetchProductsAPI({ page: 0, limit: 8 });
  const productSettings = await fetchProductSettingsAPI();

  return (
    <div>
      <Hero dict={dict} settings={homepage} />
      <Marquee settings={homepage} />
      <SubHero settings={homepage} />
      <Products
        products={productsData?.products}
        productSettings={productSettings}
        title={dict.home.productsTitle}
      />
      <RiskReducers settings={homepage} />
      <Spotlight spotlight="spotlight1" settings={homepage} />
      <ShopByCategory settings={homepage} />
      <Spotlight spotlight="spotlight2" settings={homepage} />
      <Newsletter dict={dict} settings={homepage} />
      <TrendingProducts
        dict={dict}
        settings={homepage}
        products={productsData?.products}
      />
      <CookieConsent dict={dict} />
    </div>
  );
}
